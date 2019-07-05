import {products, Discounts} from './data';
import axios from 'axios';




class Shop {

    constructor(cart) {

        this.cart = cart;

        // products that match discount rules will be stored here.
        // Only if quantity of these products reaches discount 
        // quantity are they applied, i.e: stored in discountCollection
        this.discountProducts = [];
        this.currentDiscountQuantity = 0;
        this.currentDiscount = null;
        this.collatedDiscounts = [];
        this.discounts = Discounts;
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


    applyLineItemDiscount(product) {

        const discounts = this.discounts.lineItems;
        if (product.discount) {

            for( let i=0; i < product.discount.length; i++) {
                const discountId = product.discount[i];
                for (let j=0; j<discounts.length; j++) {
                    
                    if (discounts[j].id === discountId ) {
                        var productDiscount = discounts[j];
                        // debugger;

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
                }
                console.log("THE CHECK:   ", ruleKey, productKey, rule[value], product[productKey]);
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
        // If this discount contains matching products based on the ruleset, 
        // we'll now calculate if they match the quantity to APPLY the discount
        if (discountProducts.length > 0) {

            discountRules.discount.forEach( discount => {

                if (discountProducts.length >= discount.quantity) {
                    discount['ruleset_id'] = discountRules.id;
                    discount['priority'] = discountRules.priority;

                    // we need to deal with ranges, so this check applies the discount
                    // based on whether it beats any previous applied discout quantity.
                    if (this.currentDiscountQuantity < discount.quantity) {

                        this.currentDiscountQuantity = discount.quantity;

                        this.currentDiscount = {
                            ...discount,
                            products: discountProducts
                        }
                        

                    }
                }
            }); // end foreach

            // going to keep an array of product ids for all products that 
            // have had a discount applied.  will use later to figure out discrepencies
            if (this.currentDiscount) {
                this.currentDiscount.products.forEach((product) => {
                    if (this.productsWithDiscounts.indexOf( product.id + "-" + product.photoId ) > -1 ) {
                        if (this.productsWithDoubleDiscounts.indexOf( product.id + "-" + product.photoId ) === -1 ) {
                            this.productsWithDoubleDiscounts.push(product.id +"-"+product.photoId);
                        }
                    } else {
                        this.productsWithDiscounts.push(product.id +"-"+product.photoId);
                    }
    
                });
            }
        }
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

        if (productDiscount.type === 'fixed') {
            var discountPrice = productDiscount.ammount * discountQuantity;
            product.priceTotal = nonDiscountPrice + discountPrice;
        }
        if (productDiscount.type === 'subtract') {
            var discountPrice = ( product.price - productDiscount.ammount)  * discountQuantity;
            product.priceTotal = nonDiscountPrice + discountPrice;

        }
        if (productDiscount.type === 'percent') {
            var discountPrice =  ( product.price * (productDiscount.ammount/100) ) * discountQuantity;
            product.priceTotal = nonDiscountPrice +  ( ( product.price * product.quantity) - discountPrice );

        }
        return product;
    }

    calculateCollatedDiscounts() {

        for (let property in this.discountCollection) {
            if (this.discountCollection.hasOwnProperty(property)) {
                let productDiscount = this.discountCollection[property];
                let applyFrom = 0;
                if (productDiscount.applyTo === 'rest') {
                    applyFrom = productDiscount.quantity;
                }
                productDiscount.products.forEach((product, index) => {
                    // console.log(product);
                    if (index >= applyFrom) {

                        // APPLYING DISCOUNT
                        product = this.applyDiscount(product, productDiscount);
                    }

                });

                this.collatedDiscounts.push(productDiscount);
            }
        }
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
                            if (product.priceTotal == cheapest.priceTotal) {
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
        const discounts = this.discounts.cart;
        const lineDiscounts = this.discounts.lineItems;
        let cart = this.cart;

        // final list of prodcuts that both discount rules and quantity apply to
        this.discountCollection = {};
        this.productsWithDiscounts = [];
        this.productsWithDoubleDiscounts = [];



        // Discounts can be applied directly to a product, or they can contain rules to match products
        // first iterate over products to see if they have a disount applied,
        // then itterate over discounts to see if any producst match the rules

        // apply discounts based on products
        // debugger;
        // for (let p = 0; p<cart.length; p++) {
        //     if (typeof cart[p].discount !== "undefined" && cart[p].discount.length > 0);
        //         let discountId = cart[p].discount[0];

        // }



        
        // ******************************************************
        // CART DISCOUNTS NEED TO TAKE INTO ACCOUNT LINE ITEM QUANTITY!!!
        // ******************************************************




        // apply discounts based on rules
        for( let i=0; i < discounts.length; i++) {
            let discount = discounts[i];

            this.discountProducts = [];
            this.currentDiscountQuantity = 0;
            this.currentDiscount = null;
            this.collatedDiscounts = [];

            cart_items:
            for (let j=0; j<cart.length; j++) {
                let product = cart[j];
                
                if (discount.rules) {
                    const rules = Object.keys( discount.rules );
                    // debugger;
                    let prod = this.attachDiscountsFromRules(product, rules, discount);
                    if (false === prod) {
                        // if no rules match the product, move on.
                        continue cart_items;
                    }
                } 
            } // FOR each product

            // console.log("DISCOUNTS FROM RULES", this.discountProducts);
            // debugger;
            this.attachDiscountsFromQuantity(discount, this.discountProducts);

            // In discountCollection we use an object with key of discount id so that it overwrites
            // whatever was there previously.  Easier than storing in an array,
            // then having to find index and splice to update.
            if (this.currentDiscount) {
                this.discountCollection[this.currentDiscount.ruleset_id] = this.currentDiscount;
            }


        } // FOR each discount
        
        // console.group('results');
        // console.log("DISCOUNT COLLECTION",              this.discountCollection);
        // console.log("PRODUCTS WITH DISCOUNTS",          this.productsWithDiscounts);
        // console.log("PRODUCTS WITH DOUBLE DISCOUNTS",   this.productsWithDoubleDiscounts);
        // console.groupEnd();


        this.calculateCollatedDiscounts();
        var collatedDiscounts = JSON.parse(JSON.stringify(this.collatedDiscounts));
        
        if (this.productsWithDoubleDiscounts.length > 0) {
            const productsWithDoubleDiscounts = JSON.parse(JSON.stringify(this.productsWithDoubleDiscounts));
            collatedDiscounts = this.reconcileCollatedDiscounts(productsWithDoubleDiscounts, collatedDiscounts, cart);
        }



        // console.group('reconcile');
        // console.log("COLLATED DISCOUNTS: ", collatedDiscounts);
        // // console.log(this.state.purchaseCart);
        // console.groupEnd();



        cart = this.applyDiscountsToCart(cart, collatedDiscounts);


        // console.log("FINAL CART:", cart);

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