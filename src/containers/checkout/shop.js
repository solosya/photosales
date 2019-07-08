import {Discounts} from './data';
import axios from 'axios';




class Shop {

    constructor(cart) {

        this.cart = cart;
        this.discounts = Discounts;

        // products that match discount rules will be stored here.
        // Only if quantity of these products reaches discount 
        // quantity are they applied, i.e: stored in discountCollection
        this.discountProducts               = [];
        this.currentDiscountQuantity        = 0;
        this.collatedDiscounts              = [];
        // this.productsWithDiscounts          = [];
        this.productsWithDoubleDiscounts    = [];

    }
    


    componentDidMount() {
        const self = this;
        axios.all([this.getSiteDiscounts(), this.getSiteProducts()])
        .then(axios.spread(function (discount, products) {
            self.setState({
                // discounts: discount.data.data,
                products: products.data.data
            }, () => {
                console.log(self.state);
            });
        }));
    }


    copy = (data) => {
        return JSON.parse(JSON.stringify(data));
    }

    applyLineItemDiscount(product) {

        const discounts = this.discounts.lineItems;
        if (product.discount) {

            for( let i=0; i < product.discount.length; i++) {
                const discountId = product.discount[i];
                for (let j=0; j<discounts.length; j++) {
                    
                    if (discounts[j].id === discountId ) {
                        var productDiscount = discounts[j];

                        
                        if (productDiscount.discount && productDiscount.discount.length > 0) {
                            let chosenDiscount = null;
                            let chosenDiscountAmmount = 0;
                            
                            for (let k=0; k<productDiscount.discount.length; k++) {
                                if (typeof productDiscount.discount[k].active != "undefined" && productDiscount.discount[k].active === false) {
                                    continue;
                                }

                                if (product.quantity >= productDiscount.discount[k].quantity && productDiscount.discount[k].quantity > chosenDiscountAmmount) {
                                    chosenDiscount = k;
                                    chosenDiscountAmmount = productDiscount.discount[k].quantity;
                                }
                            }
                            if (null !== chosenDiscount) {
                                productDiscount = productDiscount.discount[chosenDiscount];
                            }
                        }

                        // APPLYING DISCOUNT
                        product = this.applyDiscount(product, productDiscount);
                        product.discountName = productDiscount.name;

                        break;
                    }
                }
            }
        }
        return product;
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
                // console.log("THE CHECK:   ", ruleKey, productKey, rule[value], product[productKey]);
                if (product[ productKey ] !== rule[value] ) {
                    return false;
                }
            } // FOR each discount rule VALUE (an array of values)


        }  // FOR each discount RULE

        product = {
            ...product,
            discount: discount.id
        };

        this.discountProducts.push(product);

        return true;
    }





    attachDiscountsFromQuantity = (discountRules, discountProducts) => {
        // THIS discount contains matching products based on the ruleset. 
        // We'll now calculate if they match the quantity to APPLY the discount
        let currentDiscount = null;
        if (discountProducts.length > 0) {
            // if (typeof discountRules.type !== "undefined" ) 

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
        // console.log(this.discounts);
        const discounts = this.discounts;
        let cart = this.cart;
        console.log("THE CART", cart);
        const discountCollection = {};
        const productsWithDiscounts =[];
        const productsWithDoubleDiscounts =[];

        // Discounts can be applied directly to a product, or they can contain rules to match products
        // first iterate over products to see if they have a disount applied,
        // then itterate over discounts to see if any producst match the rules


        
        // ******************************************************
        // CART DISCOUNTS NEED TO TAKE INTO ACCOUNT LINE ITEM QUANTITY!!!
        // ******************************************************



        // console.log("THE CART", cart);

        // apply discounts based on rules
        for( let i=0; i < discounts.length; i++) {
            let discount = discounts[i];
            if (false === discount.active ) {
                continue;
            }
            this.discountProducts = [];
            this.currentDiscountQuantity = 0;
            this.collatedDiscounts = [];
            
            cart_items:
            for (let j=0; j<cart.length; j++) {
                let product = cart[j];
                
                if (discount.rules) {
                    const rules = Object.keys( discount.rules );

                    let prod = this.attachDiscountsFromRules(product, rules, discount);
                    if (false === prod) {
                        // if no rules match the product, move on.
                        continue cart_items;
                    }
                } 
            } // FOR each product

            console.log("DISCOUNT PRODUCTS", this.discountProducts);

            const currentDiscount = this.attachDiscountsFromQuantity(discount, this.discountProducts);
            
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



        console.group('results');
            console.log("DISCOUNT COLLECTION", discountCollection);
            console.log("COLLATED DISCOUNTS", collatedDiscounts);
        console.groupEnd();

        
        
        collatedDiscounts = this.copy(collatedDiscounts);
        
        if (productsWithDoubleDiscounts.length > 0) {
            
            const doublelDiscounts = this.copy(productsWithDoubleDiscounts);
            collatedDiscounts = this.reconcileCollatedDiscounts(doublelDiscounts, collatedDiscounts, cart);
        }



        // console.group('reconcile');
        // console.log("COLLATED DISCOUNTS: ", collatedDiscounts);
        // // console.log(this.state.purchaseCart);
        // console.groupEnd();



        cart = this.applyDiscountsToCart(cart, collatedDiscounts);


        console.log("FINAL CART:", cart);

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