import {Discounts} from './data';
import axios from 'axios';




class Shop {

    constructor(cart) {
        this.cart = cart;
        this.discounts = Discounts;
        this.currentDiscountQuantity = 0;
        // console.log(this.cart, this.discounts);
        return;
    }
    


    componentDidMount() {
        const self = this;
        axios.all([this.getSiteDiscounts(), this.getSiteProducts()])
        .then(axios.spread(function (discount, products) {
            self.setState({
                products: products.data.data
            }, () => {
                console.log(self.state);
            });
        }));
    }


    copy = (data) => {
        return JSON.parse(JSON.stringify(data));
    }


    getCartItemIndex(product, cart) {
        if (typeof cart === "undefined") {
            cart = this.state.cart;
        }
        return cart.findIndex((element) => {
            return element.photoId === product.photoId && element.id === product.id;
        });
    }


    attachDiscountsFromRules = (product, rules, discount) => {

        for(let r=0;r<rules.length; r++) {

            let ruleKey = rules[r];
            // the value of rule comparrison might be any datatype, including an array
            // We convert all to an array to normalise so no check is needed later.
            let rule = [].concat( discount.rules[ruleKey] );
            if (rule.length === 0) return false;

            // this loop performs the comparrison to see if a rule applies to a product
            for (let value = 0; value < rule.length; value++) {
                
                let productKey = ruleKey;
                // Map rule keys to product keys for comparrison where mismatch
                // These are largely going to be hard coded values, depending on the 
                // decided on schema for the whole enterprise
                if (ruleKey === 'products') {
                    productKey = 'id';

                    if (rule.indexOf(product[ productKey ]) > -1) {
                        break;
                    }
                }
                if (product[ productKey ] !== rule[value] ) {
                    return false;
                }
            } // FOR each discount rule VALUE (an array of values)


        }  // FOR each discount RULE

        product = {
            ...product,
            discount: discount.id
        };

        return product;
    }





    attachDiscountsFromQuantity = (discountRules, discountProducts) => {
        // THIS discount contains matching products based on the ruleset. 
        // We'll now calculate if they match the quantity to APPLY the discount
        let currentDiscount = null;
        if (discountProducts.length > 0) {

            discountRules.discount.forEach( discount => {
                


                // These discounts get applied for just one lineItem
                // The quantities of other items across the cart don't matter
                if (discountRules.type === "lineitem") {
                    const winningProducts = [];
                    for(let i = 0; i< discountProducts.length; i++) {
                        if (discountProducts[i].quantity >= discount.quantity) {
                            if (this.currentDiscountQuantity < discount.quantity) {
                                winningProducts.push( discountProducts[i] );
                            }
                        }
                    }

                    if (winningProducts.length > 0) {
                        discount['ruleset_id'] = discountRules.id;
                        currentDiscount = {
                            ...discount,
                            products: winningProducts
                        }
                        console.log("CURRENT DISCOUNT", currentDiscount);
                    }
                } 
                
                // These discounts get applied across the entire cart,
                // so both, the count of items in the card, and each lineitems quantity
                // need to be taken into account.
                else if (discountProducts.length >= discount.quantity) {
                    discount['ruleset_id'] = discountRules.id;

                    // we need to deal with ranges, so this check applies the discount
                    // based on whether it beats any previous applied discout quantity.
                    if (this.currentDiscountQuantity < discount.quantity) {

                        this.currentDiscountQuantity = discount.quantity;

                        currentDiscount = {
                            ...discount,
                            products: discountProducts
                        }
                        

                    }
                }
            }); // end foreach
        }

        return currentDiscount;
    }

    applyDiscount(product, productDiscount)
    {
        let discountQuantity = product.quantity;
        let nonDiscountQuantity = 0;
        if (productDiscount.applyTo === 'rest'){

            discountQuantity = product.quantity - productDiscount.quantity + 1;
            nonDiscountQuantity = productDiscount.quantity - 1;
        }

        let nonDiscountPrice = product.price * nonDiscountQuantity;
        let discountPrice = 0;

        if (productDiscount.type === 'fixed') {
            discountPrice = productDiscount.ammount * discountQuantity;
            product.priceTotal = nonDiscountPrice + discountPrice;
        }
        if (productDiscount.type === 'subtract') {
            discountPrice = ( product.price - productDiscount.ammount)  * discountQuantity;
            product.priceTotal = nonDiscountPrice + discountPrice;
        }
        if (productDiscount.type === 'percent') {
            discountPrice =  ( product.price * (productDiscount.ammount/100) ) * discountQuantity;
            product.priceTotal = nonDiscountPrice +  ( ( product.price * product.quantity) - discountPrice );

        }
        return product;
    }

    calculateCollatedDiscounts(discountCollection) {
        const collatedDiscounts = [];
        for (let property in discountCollection) {
            if (discountCollection.hasOwnProperty(property)) {
                let productDiscount = discountCollection[property];

                productDiscount.products.forEach((product, index) => {
                    // APPLYING DISCOUNT
                    product = this.applyDiscount(product, productDiscount);
                });

                collatedDiscounts.push(productDiscount);
            }
        }
        return collatedDiscounts;
    }



    applyDiscountsToCart(cart, collatedDiscounts) {

        for (let i=0; i<collatedDiscounts.length; i++ ) {
            let discount = collatedDiscounts[i];
            for (let j=0; j<discount.products.length; j++) {
                let product = discount.products[j];
                product.discountName = discount.name;
                let itemIndex = this.getCartItemIndex(product, cart);
                cart.splice(itemIndex, 1, product);
            }
        }
        return cart;
    }




    reconcileCollatedDiscounts(productsWithDoubleDiscounts, collatedDiscounts, cart) {

        // first we iterate over each discount, and it's array of products to find the cheapest
        // After it's found, we iterate again over each discount to remove the products that
        // don't match the cheapest one.

        for (let i = 0; i< productsWithDoubleDiscounts.length; i++) {
            const productId = productsWithDoubleDiscounts[i];
            let cheapest = null;
            for (let i=0; i<collatedDiscounts.length; i++) {
                let discount = collatedDiscounts[i];
                for(let j=0; j<discount.products.length; j++) {
                    let product = discount.products[j];
                    let discountProductId = product.id + "-" + product.photoId;
                    if (productId === discountProductId ) {
                        if (cheapest === null) {
                            cheapest = product;
                        } else {
                            if (product.priceTotal < cheapest.priceTotal) {
                                cheapest = product;
                            }
                        }
                    }
                }
            }




            if (cheapest) {
                // there could be more than one discount that has the same price
                // all we're comparing against is the cheapest so we just want the first
                let found = null; 

                for (let k=0; k<collatedDiscounts.length; k++) {
                    let discount = collatedDiscounts[k];
                    for(let l=0; l<discount.products.length; l++) {
                        let product = discount.products[l];
                        let discountProductId = product.id + "-" + product.photoId;
                        if (productId === discountProductId ) {
                            if (product.priceTotal === cheapest.priceTotal) {
                                if (found === null) {
                                    found = product;
                                }
                            } else {
                                collatedDiscounts[k].products.splice(l, 1);
                            }
                        }
                    }
                }
            }
        }
        return collatedDiscounts;
    }






    calculateTotal() {
        const discounts = this.discounts;
        // initially get a base total for all items by multiplying
        // the price by the quantity. Easy as.
        let cart = this.cart.map((item) => {
            item.priceTotal = item.price * item.quantity;
            item.priceTotalFull = item.priceTotal;
            return item;
        });


        const discountCollection = {};
        const productsWithDiscounts =[];
        const productsWithDoubleDiscounts =[];

        // Discounts can be applied directly to a product, or they can contain rules to match products
        // first iterate over products to see if they have a disount applied,
        // then itterate over discounts to see if any producst match the rules


        
        // ******************************************************
        // CART DISCOUNTS NEED TO TAKE INTO ACCOUNT LINE ITEM QUANTITY!!!
        // ******************************************************



        // apply discounts based on rules
        for( let i=0; i < discounts.length; i++) {
            let discount = discounts[i];
            if (false === discount.active ) {
                continue;
            }
            let discountProducts = [];
            this.currentDiscountQuantity = 0;
            

            for (let j=0; j<cart.length; j++) {
                let product = cart[j];
                
                if (discount.rules) {
                    const rules = Object.keys( discount.rules );

                    let prod = this.attachDiscountsFromRules(product, rules, discount);
                    if (false === prod) {
                        // if no rules match the product, move on.
                        continue;
                    }
                    discountProducts.push(prod);

                } 
            } // FOR each product


            const currentDiscount = this.attachDiscountsFromQuantity(discount, discountProducts);
            
            // going to keep an array of product ids for all products that 
            // have had a discount applied.  will use later to figure out discrepencies
            if (currentDiscount) {
                currentDiscount.products.forEach((product) => {
                    if (productsWithDiscounts.indexOf( product.id + "-" + product.photoId ) > -1 ) {
                        if (productsWithDoubleDiscounts.indexOf( product.id + "-" + product.photoId ) === -1 ) {
                            productsWithDoubleDiscounts.push(product.id +"-"+product.photoId);
                        }
                    } else {
                        productsWithDiscounts.push(product.id +"-"+product.photoId);
                    }
                });
            }
                // this.currentDiscount
                // {
                //     id: 2,
                //     discount : [
                //         {
                //             id:66,
                //             quantity: 2,
                //             ammount:10,
                //             type: 'percent',
                //             applyTo: 'all',
                //             name: "2 or more 10% off each!",
                //             active: true
                //         },
                //     ],
                //     products: [
                //         {
                //             id:4,
                //             price:3
                //         },
                //         {
                //             id:6,
                //             price:4
                //         }
                //     ]
                // }
                // this.productsWithDiscounts = ["22-pdkdd", "43-slmd"]
                // this.productsWithDoubleDiscounts = ["43-slmd"]





            // In discountCollection we use an object with key of discount id so that it overwrites
            // whatever was there previously.  Easier than storing in an array,
            // then having to find index and splice to update.
            if (currentDiscount) {
                discountCollection[currentDiscount.ruleset_id] = currentDiscount;
            }

        } // FOR each discount


        let allDiscounts = this.copy(discountCollection);
        let collatedDiscounts = this.calculateCollatedDiscounts(allDiscounts);
        // collatedDiscounts is array of discounts that each contain an array of 
        // products where that discount is calculated and applied
        // However:
        //    The same product could have multiple discounts applied.  These products will be flagged
        //    in the array productsWithDoubleDiscounts.  We use this array to reconcile the discounts by
        //    picking the best disoucnt.



        // console.group('results');
        //     console.log("DISCOUNT COLLECTION", discountCollection);
        //     console.log("COLLATED DISCOUNTS", collatedDiscounts);
        // console.groupEnd();

        
        
        collatedDiscounts = this.copy(collatedDiscounts);
        
        if (productsWithDoubleDiscounts.length > 0) {
            
            const doublelDiscounts = this.copy(productsWithDoubleDiscounts);
            collatedDiscounts = this.reconcileCollatedDiscounts(doublelDiscounts, collatedDiscounts, cart);
        }



        cart = this.applyDiscountsToCart(cart, collatedDiscounts);



        const total = cart.reduce( (accumulator, current) => {
            return current.priceTotal  + accumulator;
        }, 0);

        return {
            cart,
            total
        };

    }


}



export default Shop;