import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Header               from '../../components/partials/section_header.js';
import CardCart             from '../../components/card/cardCart.js'; 
import Divider              from '../../components/divider/divider';
import Flexrow              from '../../components/layout/flexrow';
import axios from 'axios';
// import Modal                from '../../components/modals/modal';
import * as actionTypes     from '../../store/actions';


class Checkout extends Component {
    
    state = {
        networkData: null,
        blogData: {
            title: "Photo sales",
            url: "www.picturebooth.com",
            guid: "b6d174e5-70d2-4274-900a-46632b9b3e56",
        },
        photos: null,
        cart: [],
        purchaseCart: [],
        total: 0,
        discounts: {
            lineItems: [
                {
                    id: 1,
                    discount : 2,
                    type: 'fixed',
                    applyTo: 'rest',
                    quantity: 2
                },
                {
                    id: 2,
                    discount : 10,
                    type: 'fixed',
                    applyTo: 'rest',
                    quantity: 2,
                },
                {
                    id: 3,
                    discount : 20,
                    type: 'fixed',
                    applyTo: 'rest',
                    quantity: 3,
                },
                {
                    id: 4,
                    discount : 25,
                    type: 'fixed',
                    applyTo: 'rest',
                    quantity: 2,
                },
                {
                    id: 5,
                    discount : 50,
                    type: 'fixed',
                    applyTo: 'rest',
                    quantity: 2,
                },

            ],
            // category: [],
            cart: [
                // {
                //     id: 50,
                //     ammount : 5,
                //     type: 'fixed',
                //     applyTo: 'all',
                //     quantity: 2,
                //     priority: 10,
                // },
                {
                    id: 51,
                    priority: 7,
                    discount : [
                        {
                            id:66,
                            quantity: 2,
                            ammount:30,
                            type: 'fixed',
                            applyTo: 'all',
                        },
                        {
                            id:77,
                            quantity: 6,
                            ammount:20,
                            type: 'fixed',
                            applyTo: 'all',
                        }
                    ],
                    rules: {
                        // productType: 'photo',
                        // category: "digital",
                        // tags: [],
                        products: [33],
                    }
                },
                {
                    id: 52,
                    priority: 8,
                    discount : [
                        {
                            id: 45,
                            quantity: 2,
                            ammount:15,
                            type: 'fixed',
                            applyTo: 'all',
                        },
                        {
                            id:46,
                            quantity: 6,
                            ammount:10,
                            type: 'fixed',
                            applyTo: 'all',
                        }
                    ],
                    rules: {
                        // productType: 'photo',
                        // category: "digitals",
                        // tags: [],
                        products: [22],
                    }
                },
                {
                    id: 53,
                    priority: 12,
                    discount : [
                        {
                            id:99,
                            quantity: 2,
                            ammount:555,
                            type: 'fixed',
                            applyTo: 'all',
                        },
                        {
                            id:87,
                            quantity: 4,
                            ammount:444,
                            type: 'fixed',
                            applyTo: 'all',
                        }
                    ],
                    rules: {
                        // productType: 'photo',
                        category: "printly",
                        // tags: [],
                        // products: [1],
                    }
                },

            ]
        },
        products: {
            print: [
                {
                    id: 3,
                    label: '6" x 4" ($5, additional copies $2)',
                    price : 5,
                    priceTotal: 5,
                    priceTotalFull: 5,
                    discount: [1],
                    category: 'print',

                },
                {
                    id: 4,
                    label: '7" x 5" ($7, additional copies $2)',
                    price : 7,
                    priceTotal: 7,
                    priceTotalFull: 7,
                    discount: [1],
                    category: 'print',

                },
                {
                    id: 5,
                    label: '8" x 6" ($7, additional copies $2)',
                    price : 7,
                    priceTotal: 7,
                    priceTotalFull: 7,
                    discount: [1],
                    category: 'print',

                },
                {
                    id: 6,
                    label: '12" x 8" ($15, additional copies $10)',
                    price : 15,
                    priceTotal: 15,
                    priceTotalFull: 15,
                    discount: [2],
                    category: 'print',
                },
                {
                    id: 6,
                    label: '14" x 11" ($25, additional copies $20)',
                    price : 25,
                    priceTotal: 25,
                    priceTotalFull: 25,
                    discount: [3],
                    category: 'print',
                },
                {
                    id: 7,
                    label: '18" x 12" ($30, additional copies $25)',
                    price : 30,
                    priceTotal: 30,
                    priceTotalFull: 30,
                    discount: [4],
                    category: 'print',
                },
                {
                    id: 8,
                    label: '36" x 24" ($55, additional copies $50)',
                    price : 55,
                    priceTotal: 55,
                    priceTotalFull: 55,
                    discount: [5],
                    category: 'print',
                }
            ],
            digital: [
                {
                    id: 22,
                    label: 'Personal or single use',
                    price :  20, // original price per item
                    priceTotal: 20, // accumulated total with discount
                    priceTotalFull: 20, // accumulated total without discount
                    category: 'digital',
                },
                {
                    id: 33,
                    label: 'Commercial use',
                    price : 50,
                    priceTotal: 50,
                    priceTotalFull: 50,
                    category: 'digital',
                },
            ]
        },
    }



    // these zeroed in calculate function;
    currentDiscountQuantity;
    currentDiscount;
    discountCollection;
    productsWithDiscounts;
    productsWithDoubleDiscounts;
    discountProducts;
    collatedDiscounts;


    componentDidMount() {
        // return axios.get('/api/theme', qs.stringify( this.options ) )
        // // return axios.get('/api/search?s=this')
        //     .then( response => {
        //         // var data = response.data;
        //     }).catch( error => {
        //     });    

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
            // console.log('DECIDING IF ENOUGH DISCOUNT PRODUCTS ', product.id);
            // debugger;
            // console.log(discountRules);
            discountRules.discount.forEach( discount => {
                // console.log("DISCOUNT QUANTITY", discount.quantity, discountProducts.length);
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
                // debugger;
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

    getFromCart = (photoid, productId) => {
        const item = this.state.purchaseCart.filter((item) => {
            return item.photoId === photoid && item.productId === productId;
        });

        if (item.length > 0) {
            JSON.parse(JSON.stringify(item[0]));
        }
        return null;
    }

    getCartItemIndex(product, cart) {
        if (typeof cart === "undefined") {
            cart = this.state.purchaseCart;
        }
        return cart.findIndex((element) => {
            // console.log("PHOTO IDS");
            // console.log(element.photoId, product.photoId);
            // console.log(element.id, product.id);
            return element.photoId === product.photoId && element.id === product.id;
        });
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
                        const ammount = productDiscount.ammount;
                        product.priceTotal = ammount;
                    }

                });

                this.collatedDiscounts.push(productDiscount);
            }
        }
    }

    reconcileCollatedDiscounts(productsWithDoubleDiscounts, collatedDiscounts) {
        debugger;

        for (let i = 0; i< productsWithDoubleDiscounts.length; i++) {


            const productId = productsWithDoubleDiscounts[i];
            var discounts = collatedDiscounts.filter((discount) => {
                return discount.products.filter((prod) => {
                    return prod.id + "-" + prod.photoId === productId;
                });
            });

        }

        // get best discount
        let bestValue = Infinity;
        let bestDiscount = null;
        for (var j=0; j<discounts.length; j++) {
            if (discounts[j].ammount < bestValue) {
                bestValue = discounts[j].ammount;
                bestDiscount = discounts[j].id;
            }
        }
        const testCart = JSON.parse(JSON.stringify(this.state.purchaseCart));
        // console.log(discounts);
        // console.log(bestValue, bestDiscount);
        // this.productsWithDoubleDiscounts;
        // this.collatedDiscounts
    }


    applyDiscountsToCart() {
        const cart = JSON.parse(JSON.stringify(this.state.purchaseCart));

        for (let i=0; i<this.collatedDiscounts.length; i++ ) {
            console.log('applying discounts');

            let discount = this.collatedDiscounts[i];
            for (let j=0; j<discount.products.length; j++) {
                let product = discount.products[j];
                let itemIndex = this.getCartItemIndex(product, cart);
                cart.splice(itemIndex, 1, product);
                // console.log(itemIndex);
            }
        }
        return cart;
    }



    calculateTotal = () => {

        const discounts = this.state.discounts.cart;
        const cart = this.state.purchaseCart;

        // final list of prodcuts that both discount rules and quantity apply to
        this.discountCollection = {};
        this.productsWithDiscounts = [];
        this.productsWithDoubleDiscounts = [];

        for( let i=0; i < discounts.length; i++) {
            let discount = discounts[i];
            // console.log("TRYING DISCOUNT", discounts[i].id);

            // products that match discount rules will be stored here.
            // Only if quantity of these products reaches discount 
            // quantity are they applied, i.e: stored in discountCollection
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

            console.log("DISCOUNTS FROM RULES", this.discountProducts);
            this.attachDiscountsFromQuantity(discount, this.discountProducts);


            // In discountCollection we use an object with key of discount id so that it overwrites
            // whatever was there previously.  Easier than storing in an array,
            // then having to find index and splice to update.
            if (this.currentDiscount) {
                this.discountCollection[this.currentDiscount.ruleset_id] = this.currentDiscount;
            }

        } // FOR each discount
        
        console.group('results');
        console.log("DISCOUNT COLLECTION",              this.discountCollection);
        console.log("PRODUCTS WITH DISCOUNTS",          this.productsWithDiscounts);
        console.log("PRODUCTS WITH DOUBLE DISCOUNTS",   this.productsWithDoubleDiscounts);
        console.groupEnd();


        this.calculateCollatedDiscounts();

        if (this.productsWithDoubleDiscounts.length > 0) {
            const productsWithDoubleDiscounts   = JSON.parse(JSON.stringify(this.productsWithDoubleDiscounts))
            const collatedDiscounts             = JSON.parse(JSON.stringify(this.collatedDiscounts))
            
            this.reconcileCollatedDiscounts(productsWithDoubleDiscounts, collatedDiscounts);
        }



        console.group('reconcile');
        console.log("COLLATED DISCOUNTS: ", this.collatedDiscounts);
        console.log(this.state.purchaseCart);
        console.groupEnd();





        const finalCart = this.applyDiscountsToCart();



        console.log("FINAL CART:", finalCart);



        const total = finalCart.reduce( (accumulator, current) => {
            return current.priceTotal  + accumulator;
        }, 0);
        // console.log(finalCart);
        this.setState({
            total,
            purchaseCart : finalCart
        })
    }

    handlePurchaseCart = (product) => {
        const cart = [...this.state.purchaseCart];
        const update = this.getCartItemIndex(product);

        if (update === -1) {
            cart.push(product);
        } else {
            cart[update] = product;
        }

        this.setState({purchaseCart: cart}, () => {
            console.log("STATE:" ,this.state);
            this.calculateTotal();
        });

    }


    handleRemoveItem = (product) => {

        const cart = [...this.state.purchaseCart].filter((element) => {
            // console.log(element.photoId, product.photoId);
            // console.log(element.id, product.id);
            return !(element.photoId === product.photoId && element.id === product.id);
        });

        this.setState({purchaseCart: cart}, () => {
            // console.log("CHECKOUT STATE:" ,this.state);
            this.calculateTotal();
        });

    }
    
    handleRemovePhoto = (id) => {
        const cart = this.state.purchaseCart.filter((item) => {
            return item.photoId !== id;
        });
        const photo = {};
        photo.id = id;
        this.setState({
            purchaseCart: cart
        }, () => {
            this.props.toggleCart( photo );
            this.calculateTotal();
        });
    }


    homeLinkHandler = () => {
        this.props.history.push('/photo');
    }

    handleGetCartItemDiscount = (product) => {
        const item = this.getCartItemIndex(product);
        if (item === -1) {
            return false;
        }
        return this.state.purchaseCart[item].priceTotal;
    }
    
    render() {
        const cards = this.props.cart.map( (product, i) => {
            const card =
                [<CardCart 
                    key                 = {i}
                    data                = {product}
                    styles              = "card-3-mobile card-3-tablet card-3-desktop"
                    cardHandler         = {() => { return false;}}
                    favHandler          = {this.props.favHandler}
                    products            = {this.state.products}
                    cartHandler         = {null}
                    handleItemRemove    = {this.handleRemoveItem}
                    handlePurchaseCart  = {this.handlePurchaseCart}
                    
                    // discounts applied in this cart should update the discount
                    // ammount in the child component, so add a function to the child,
                    // to query the parent for its discount
                    handleGetCartItemDiscount = {this.handleGetCartItemDiscount}
                    discounts           = {this.state.discounts}
                    handleRemovePhoto   = {this.handleRemovePhoto}
                    favourite
                ></CardCart>];
            
            // add a divider beneath each card except the last
            if (i !== this.props.cart.length -1) {
                card.push( <Divider key={i+'div'}/>)
            }

            return card;
        });

        const purchases = this.state.purchaseCart.map((item, i) => {
            return (
                <div key={i}>
                    <p>{item.label} - {item.quantity} - ${item.priceTotal}</p>
                </div>
            )
        });




        return (
            <>
                <Container>
        
                    <Row>
                        <Col classes={["col-12"]}>
                            <Header 
                                url                 = {this.state.blogData.url}
                                title               = {this.state.blogData.title} 
                                cartItems           = {this.props.cart.length}
                                favourites          = {this.props.favourites.length}
                                homeLinkHandler     = {this.homeLinkHandler}
                                favouritesHandler   = {this.showFavourites}
                                larger 
                                cart
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col classes={["col-12", "col-lg-8"]}>

                            <Row>
                                <Col classes={["col-12"]}>
                                    <Header 
                                        title="My Cart"
                                        thin
                                    />
                                </Col>
                            </Row>



                            <Row>
                                <Col classes={["col-12"]}>
                                    { cards ? cards : null}
                                </Col>
                            </Row>


                            <Row>
                                <Col classes={["col-12"]}>
                                    <Flexrow>
                                        <h2>Total</h2>
                                        <p>${this.state.total} AUD</p>
                                    </Flexrow>
                                </Col>
                            </Row>
                        </Col>


                        <Col classes={["col-12", "col-lg-4"]}>
                            {purchases}
                        </Col>


                    </Row>


                </Container>


            </>


        )
    }
}

const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFavourite: (photo) => {
            dispatch({type:actionTypes.TOGGLE_FAVOURITE, photo})
        },
        toggleCart: (photo) => dispatch({type:actionTypes.TOGGLE_CART, photo})
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

