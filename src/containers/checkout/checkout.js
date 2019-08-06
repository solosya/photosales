// Libraries
import React, {Component}           from 'react'
import {connect}                    from 'react-redux'
import qs                           from 'qs'
import axios                        from 'axios'
import CSSTransition                from 'react-transition-group/CSSTransition'
import TransitionGroup              from 'react-transition-group/TransitionGroup'
import {Elements, StripeProvider}   from 'react-stripe-elements'

// Components
import Row                          from '../../components/layout/row'
import Col                          from '../../components/layout/col'
import Modal                        from '../../components/modals/modal'
import Total                        from '../../components/checkoutTotal'
import Header                       from '../../components/partials/section_header.js'
import Button                       from '../../components/button/button'
import Payment                      from './payment'
import Billing                      from './billing'
import CardCart                     from '../../components/card/cardCart.js'
import Container                    from '../../components/layout/container'


// Actions
import * as actionTypes             from '../../store/actions/actions'
import * as actionCreators          from '../../store/actions/actions'

// import {products}                   from './data'

class Checkout extends Component {
    
    state = {
        networkData: null,
        blogData: {
            title: "Photo sales",
            url: "www.picturebooth.com",
            guid: "b6d174e5-70d2-4274-900a-46632b9b3e56",
        },
        showTerms: false,
        photos: null,
        purchaseCart: [],
        total: 0,
        products: {},
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





    getSiteDiscounts() {
        return axios.get('/api/shop/discounts' );
    }

    getSiteProducts() {
        return axios.get('/api/shop/products' );
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
        // console.log("PRODUCT", product);
        this.props.addLineItemToCart( product );
    }

    removeLineItemFromCart = (productIndex, photoId) => {
        this.props.removeLineItemFromCart( productIndex, photoId );
    }

    handleQuantity = (quantity, product) => {
        product.quantity = +quantity;
        this.props.updateCartItem( product );
    }

    handleRemovePhoto = (photo) => {
        this.props.toggleCart( photo );
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
        console.log(billingErrors);
        let showTerms = false;
        if ( billingErrors.indexOf('licence') === 0 && billingErrors.length ===1) {
            showTerms = true;
        }

        this.setState({
            billingErrors,
            showTerms
        }, () => {
            console.log(this.state.billingErrors);
        });

        // if (billingErrors.length > 0) {
        //     console.log('NOT DOING PAYENT');
        //     return;
        // }



        const cart = actionCreators.getLineItemsFromCart(this.props.cart).map((c) => {
            return {
                id       : c.id,
                photoId  : c.photoId,
                category : c.category,
                quantity : c.quantity,
            }
        });


        const billing = this.state.billing;
        axios.post('/api/shop/purchase', qs.stringify( {cart, billing})).then((r) => {
            // axios.post('/api/shop/purchase', qs.stringify( {"stripeToken": token.id, cart})).then((r) => {
                console.log(r);
        }).catch((e) => {
            console.log(e);
        });


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


    photoStatusHandler = (photoid) => {
        return this.props.photoStatusHandler(photoid);
    } 

    showGallery = (index) => {
        const photo = this.props.cart[index];
        this.props.showGallery(photo);
    }
    termsHandler = () => {
        this.setState({showTerms: false});
    }

    render() {
        let purchases = null;
        let cards = null;

        const terms = 
            <Modal 
                width        = "500px" 
                height       = "150px" 
                closeHandler = {this.termsHandler} 
                children     = { () => (
                    <>
                        <p style={{marginTop: '30px', textAlign:'center'}}>Please agree to the terms of use</p>
                        <Button handler={this.termsHandler} classes={["button", "button--blue", "button--top-30", "button--center"]}>OKAY</Button>
                    </>
                )} >   
            </Modal>








        if (this.state.products) {
            console.log('CHECKING FOR CARDCART', this.state.products);
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
                            count                   = {i}
                            styles                  = "card-3-mobile card-3-tablet card-3-desktop"
                            cardHandler             = {this.showGallery}
                            favHandler              = {this.props.toggleFavourite}
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

            // purchases = this.state.purchaseCart.map((item, i) => {
            //     return (
            //         <div key={i}>
            //             <p>{item.label} - {item.quantity} - ${item.priceTotal}</p>
            //         </div>
            //     )
            // });
        }



        return (
            <>

                {this.state.showTerms && terms}

                <Container>
        
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
                                        total={this.props.total / 100}
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
        isLoggedIn: state.isLoggedIn,
        pageTitle: state.pageTitle
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCart:             (photo)     => dispatch( actionCreators.toggleCart(photo) ),
        updateCartItem:         (product)   => dispatch( actionCreators.updateCartItem(product) ),
        toggleFavourite:        (photo)     => dispatch( actionCreators.toggleFavourite(photo) ),
        fetchFavourites :       ()          => dispatch( actionCreators.fetchSaved() ),
        addLineItemToCart:      (product)   => dispatch( actionCreators.addItemToCart(product) ),
        removeLineItemFromCart: (productIndex, photoId) => dispatch( {type:actionTypes.REMOVE_ITEM_FROM_CART, productIndex, photoId} ),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

