import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Header               from '../../components/partials/section_header.js';
import CardCart             from '../../components/card/cardCart.js'; 
import Divider              from '../../components/divider/divider';
import Total                from '../../components/checkoutTotal';
import Billing              from './billing';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Payment              from './payment';
import axios from 'axios';
// import Modal                from '../../components/modals/modal';
import * as actionTypes     from '../../store/actions/actions';
import * as actionCreators  from '../../store/actions/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {products} from './data';
import Todo from './TodoList';

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
        // discounts: discounts,
        products: products,
        billing: {
            firstname   : "",
            lastname    : "",
            email       : "",
            phone       : "",
            address     : "",
            suburb      : "",
            state       : "",
            postcode    : "",
            licence     : false,
        },
        billingErrors : [],
        billingRequired :["firstname", "lastname", "email", "phone", "address", "suburb", "state", "postcode", "licence"]
    }




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
                products: products.data.data
            }, () => {
                console.log(self.state);
            });
        }));
    }




    getCartItemIndex(product, cart) {
        if (typeof cart === "undefined") {
            cart = this.state.purchaseCart;
        }
        return cart.findIndex((element) => {
            return element.photoId === product.photoId && element.id === product.id;
        });
    }







    addLineItemToCart = (product) => {
        this.props.addLineItemToCart( product );
    }

    removeLineItemFromCart = (productId, photoId) => {
        this.props.removeLineItemFromCart( productId, photoId );
    }

    handleQuantity = (quantity, product) => {
        product.quantity = +quantity;
        this.props.updateCartItem( product );
    }


    handleRemovePhoto = (id) => {
        // const cart = this.state.purchaseCart.filter((item) => {
        //     return item.photoId !== id;
        // });
        const photo = {};
        photo.id = id;
        // this.setState({
        //     purchaseCart: cart
        // }, () => {
            this.props.toggleCart( photo );
        // });
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
    

    checkBillingErrors = (form, field = false) => {
        let billing = form || this.state.billing;
        if (field) { 
            billing = {[field]: billing[field]};
        }
        const billingRequired = this.state.billingRequired;
        let billingErrors = [...this.state.billingErrors];

        for (let field in billing) {
            if (billing.hasOwnProperty(field)) {
                if (billingRequired.indexOf(field) > -1 ) {
                    const fieldIndex = billingErrors.indexOf(field);
                    
                    if (!billing[field]) {
                        if (fieldIndex === -1) {
                            billingErrors.push(field);
                        }
                    } else {
                        if (fieldIndex > -1) {
                            billingErrors.splice(fieldIndex, 1);
                        }
                    }
                }
            }
        }
        return billingErrors;
    }

    handlePayment = (token) => {
        const billingErrors = this.checkBillingErrors();

        this.setState({
            billingErrors
        }, () => {
            console.log(this.state.billingErrors);
        });



        if (billingErrors.length > 0) {
            console.log('NOT DOING PAYENT');
            return;
        }
        console.log('ALL GOOD!!');

        console.log('and the token is!!', token);
        console.log(this.state.billing);
    }


    handleBillingForm = (value, field) => {
        const billing = {...this.state.billing};
        if (field === 'licence') {
            // licence is the only boolean and we get the old state,
            // so flip to new state
            value = !value;
        }
        billing[field] = value;
        const billingErrors = this.checkBillingErrors(billing, field);
        
        this.setState({
            billing,
            billingErrors
        });
    }
    handleFindBillingErrors = (field) => {
        const billingErrors = this.state.billingErrors;
        if (billingErrors.indexOf(field) > -1) {
            return true;
        }
        return false;
    }
    handleRemoveFuck = (i) => {

    }

    render() {
        let purchases = null;
        let cards = null;
        if (this.state.products) {
            // console.log("RENDERING,", this.props.cart);
            
            cards = this.props.cart.map( (product, i) => {
                const card =
                    <CardCart 
                        key                     = {"milo"+i}
                        data                    = {product}
                        styles                  = "card-3-mobile card-3-tablet card-3-desktop"
                        cardHandler             = {() => { return false;}}
                        favHandler              = {this.props.favHandler}
                        products                = {this.state.products}
                        cartHandler             = {null}
                        removeLineItemFromCart  = {this.removeLineItemFromCart}
                        addLineItemToCart       = {this.addLineItemToCart}
                        handleQuantity          = {this.handleQuantity}
                        
                        // discounts applied in this cart should update the discount
                        // ammount in the child component, so add a function to the child,
                        // to query the parent for its discount
                        handleGetCartItemDiscount = {this.handleGetCartItemDiscount}
                        handleRemovePhoto   = {this.handleRemovePhoto}
                        favourite
                        onClick = {() => this.handleRemoveFuck(i)}
                    >fuck</CardCart>;
                
                // add a divider beneath each card except the last
                // if (i !== this.props.cart.length -1) {
                //     card.push( <Divider key={i+'div'}/>)
                // }

                return card;
            });
            console.log(cards);
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
                                        medium
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col classes={["col-12", "col-lg-8"]}>
                                    <Todo />
                                </Col>
                            </Row>


                            <Row>
                                <Col classes={["col-12"]}>
                                    <ReactCSSTransitionGroup
                                        transitionName="card"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={3000}
                                        transitionAppear={true}
                                        transitionAppearTimeout={500}

                                        >
                              
                                        { cards ? cards : null}
                                    </ReactCSSTransitionGroup>
                                </Col>
                            </Row>


                            <Row>
                                <Col classes={["col-12"]}>
                                    <Total
                                        total={this.props.total}
                                        borderTop
                                        >
                                    </Total>
                                </Col>
                            </Row>
                        </Col>


                        <Col classes={["col-12", "col-lg-4"]}>
                            {purchases}
                        </Col>


                    </Row>




                    <Billing 
                        handleBillingForm = {this.handleBillingForm}
                        handleFindBillingErrors = {this.handleFindBillingErrors}
                        {...this.state.billing}
                    />



                    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                        <Elements>
                            <Payment handleSubmit={this.handlePayment}/>
                        </Elements>
                    </StripeProvider>
                </Container>


            </>


        )
    }
}

const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart,
        total: state.total,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFavourite: (photo) => dispatch({type:actionTypes.TOGGLE_FAVOURITE, photo}),
        toggleCart: (photo) => dispatch({type:actionTypes.TOGGLE_CART, photo}),
        addLineItemToCart: (product) => dispatch(actionCreators.addItemToCart(product)),
        removeLineItemFromCart: (productId, photoId) => dispatch({type:actionTypes.REMOVE_ITEM_FROM_CART, productId, photoId}),
        updateCartItem: (product) => dispatch(actionCreators.updateCartItem(product))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

