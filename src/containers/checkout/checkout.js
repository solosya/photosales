// Libraries
import React, {Component}   from 'react';
import {connect}                    from 'react-redux';
import axios                        from 'axios';
import {Elements, StripeProvider}   from 'react-stripe-elements';
import TransitionGroup              from 'react-transition-group/TransitionGroup'; 
import CSSTransition                from 'react-transition-group/CSSTransition'; 

// Components
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Header               from '../../components/partials/section_header.js';
import CardCart             from '../../components/card/cardCart.js'; 
import Total                from '../../components/checkoutTotal';
import Billing              from './billing';
import Payment              from './payment';
import Modal                from '../../components/modals/modal';
import Favourites           from '../../components/favourites/favourites';

// Actions
import * as actionTypes     from '../../store/actions/actions';
import * as actionCreators  from '../../store/actions/actions';

import {products} from './data';

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
        showFavourites : false,
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


    showFavourites = () => {
        if (this.props.favourites.length > 0) {
            this.setState({
                showFavourites : true,
            });
            document.body.setAttribute('style', 'overflow: hidden;')
        }
    }
    closeFavourites = () => {
        this.setState({
            showFavourites: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;')
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
        this.props.toggleCart( {id} );
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

    render() {
        let purchases = null;
        let cards = null;


        const favourites = 
            <Modal closeHandler={this.closeFavourites} children={favourites => (
                <Favourites 
                    favourites  = {this.props.favourites}
                    favHandler  = {this.props.toggleFavourite}
                    cartHandler = {this.props.toggleCart}
                />
            )} >   
            </Modal>





        if (this.state.products) {
            
            cards = this.props.cart.map( (product, i) => {
                const key = product.title + product.id;
                const card =
                    <CSSTransition key={key}
                        timeout={400}
                        classNames="card"
                        >
                        <CardCart  
                            key                     = {"Card"+i}
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
                        />
                    </CSSTransition>;
                
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
                {this.state.showFavourites  ? favourites : null}

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
                                <Col classes={["col-12"]}>
                                    <TransitionGroup>
                                        { cards ? cards : null}
                                    </TransitionGroup>
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

