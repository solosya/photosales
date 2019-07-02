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

import {products, discounts} from './data';
import Shop from './shop';


class Checkout extends Component {
    
    state = {
        networkData: null,
        blogData: {
            title: "Photo sales",
            url: "www.picturebooth.com",
            guid: "b6d174e5-70d2-4274-900a-46632b9b3e56",
        },
        photos: null,
        purchaseCart: [],
        total: 0,
        discounts: discounts,
        products: products,

    }



    // these zeroed in calculate function;
    currentDiscountQuantity;
    currentDiscount;
    discountCollection;
    productsWithDiscounts;
    productsWithDoubleDiscounts;
    discountProducts;
    collatedDiscounts;

    getSiteDiscounts() {
        return axios.get('/api/shop/discounts' );    
    }

    getSiteProducts() {
        return axios.get('/api/shop/products' );    
    }

    componentDidMount() {
        const self = this;
        axios.all([this.getSiteDiscounts(), this.getSiteProducts()])
        .then(axios.spread(function (discount, products) {
            self.setState({
                discounts: discount.data.data,
                products: products.data.data
            }, () => {
                console.log(self.state);
            });
        }));
    }






    // getFromCart = (photoid, productId) => {
    //     const item = this.state.purchaseCart.filter((item) => {
    //         return item.photoId === photoid && item.productId === productId;
    //     });

    //     if (item.length > 0) {
    //         JSON.parse(JSON.stringify(item[0]));
    //     }
    //     return null;
    // }






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








    handlePurchaseCart = (product) => {

        this.props.addItemToCart( product );
        console.log("AFTER DIPATCHING CALL!!!");
        const cart = JSON.parse(JSON.stringify(this.state.purchaseCart));
        const update = this.getCartItemIndex(product);
        if (update === -1) {
            cart.push(product);
        } else {
            cart[update] = product;
        }


        const discounts = JSON.parse(JSON.stringify(this.state.discounts))
        const shop = new Shop(cart, discounts);
        const totals = shop.calculateTotal();


        this.setState({
            total: totals.total,
            purchaseCart : totals.cart
        });

    }

    handleQuantity = (e, productID, photoId) => {
        console.log(productID);
        const quantity = e.target.value;
        const cartId = this.getCartItemIndex({id:productID, photoId});
        console.log("HANDLE QUANTITY", cartId);


        const product = JSON.parse(JSON.stringify(this.state.purchaseCart[cartId]));
        product.quantity = +quantity;
        product.priceTotal = product.price * product.quantity;
        product.priceTotalFull = product.priceTotal;


        const discounts = this.state.discounts.lineItems;
        if (product.discount) {

            for( let i=0; i < product.discount.length; i++) {
                const discountId = product.discount[i];
                for (let j=0; j<discounts.length; j++) {
                    
                    if (discounts[j].id === discountId && product.quantity >= discounts[j].quantity) {
                        const discountQuantity = product.quantity - discounts[j].quantity + 1;
                        const discountPrice = discounts[j].discount * discountQuantity;
                        const nonDiscountPrice = product.price * ( product.quantity - discountQuantity );
                        product.priceTotal = discountPrice + nonDiscountPrice;
                        break;
                    }
                }
            }
        }

        const purchaseCart = JSON.parse(JSON.stringify(this.state.purchaseCart));
        purchaseCart[cartId] = product;

        this.setState({
            purchaseCart 
        }, () => {
            console.log(this.state);
        });
    }


    handleRemoveLineItem = (product) => {

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
        this.props.history.push("/"+window.layoutTemplate);
    }

    handleGetCartItemDiscount = (product) => {
        const item = this.getCartItemIndex(product);
        if (item === -1) {
            return false;
        }
        return this.state.purchaseCart[item].priceTotal;
    }
    
    render() {
        let purchases = null;
        let cards = null;
        if (this.state.discounts && this.state.products) {

            cards = this.props.cart.map( (product, i) => {
                const card =
                    [<CardCart 
                        key                 = {i}
                        data                = {product}
                        styles              = "card-3-mobile card-3-tablet card-3-desktop"
                        cardHandler         = {() => { return false;}}
                        favHandler          = {this.props.favHandler}
                        products            = {this.state.products}
                        cartHandler         = {null}
                        handleItemRemove    = {this.handleRemoveLineItem}
                        handlePurchaseCart  = {this.handlePurchaseCart}
                        handleQuantity      = {this.handleQuantity}
                        
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

            purchases = this.state.purchaseCart.map((item, i) => {
                return (
                    <div key={i}>
                        <p>{item.label} - {item.quantity} - ${item.priceTotal}</p>
                    </div>
                )
            });
        }



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
                                    {console.log(this.props) }
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
        cart: state.cart,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFavourite: (photo) => dispatch({type:actionTypes.TOGGLE_FAVOURITE, photo}),
        toggleCart: (photo) => dispatch({type:actionTypes.TOGGLE_CART, photo}),
        addItemToCart: (product) => dispatch({type:actionTypes.ADD_ITEM_TO_CART, product})
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

