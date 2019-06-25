import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Header               from '../../components/partials/section_header.js';
import CardCart             from '../../components/card/cardCart.js'; 
import Divider              from '../../components/divider/divider';
import Flexrow              from '../../components/layout/flexrow';

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
                    quantity: 1
                },
                {
                    id: 2,
                    discount : 2,
                    type: 'fixed',
                    applyTo: 'rest',
                    quantity: 3,
                },
                {
                    id: 3,
                    discount : 2,
                    type: 'percent',
                    applyTo: 'all',
                    quantity: 3,
                    category: 'print',
                }
            ],
            // category: [],
            cart: [
                {
                    id: 50,
                    discount : 5,
                    type: 'fixed',
                    applyTo: 'all',
                    quantity: 2
                },
                {
                    id: 51,
                    discount : [
                        {
                            quantity: 2,
                            discount:20,
                            type: 'fixed',
                            applyTo: 'all',
                        },
                        {
                            quantity: 4,
                            discount:15,
                            type: 'fixed',
                            applyTo: 'all',
                        }
                    ],
                    rules: {
                        // productType: 'photo',
                        category: "digital",
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
                    displayPrice: 5,
                    originalPrice: 5,
                    discount: [1],
                    category: 'print',

                },
                {
                    id: 4,
                    label: '7" x 5" ($7, additional copies $2)',
                    price : 7,
                    displayPrice: 7,
                    originalPrice: 7,
                    discount: [2],
                    category: 'print',

                },
                {
                    id: 5,
                    label: '8" x 6" ($7, additional copies $2)',
                    price : 7,
                    displayPrice: 7,
                    originalPrice: 7,
                    discount: [3],
                    category: 'print',

                }
            ],
            digital: [
                {
                    id: 0,
                    label: 'Personal or single use',
                    price : 20,
                    displayPrice: 20,
                    originalPrice:20,
                    category: 'digital',
                },
                {
                    id: 1,
                    label: 'Commercial use',
                    price : 50,
                    displayPrice: 50,
                    originalPrice:50,
                    category: 'digital',
                },
            ]
        },
    }


    calculateTotal = () => {

        const discounts = this.state.discounts.cart;
        const cart = this.state.purchaseCart;
        console.log(discounts);

        for( let i=0; i < discounts.length; i++) {
            let temp = [];

            cart_items:
            for (let j=0; j<cart.length; j++) {
                console.log('checking rules');
                if (discounts[i].rules) {
                    const rules = Object.keys( discounts[i].rules );
                    console.log(rules);
                    
                    for(let r=0;r<rules.length; r++) {
                        if (cart[j][ rules[r] ] !==  discounts[i].rules[rules[r]] ) {
                            continue cart_items;
                        }
                    }

                    temp.push(cart[j]);

                }
                // console.log(temp.length, discounts[i].quantity);
                // console.log("TEMP CART", temp);
                if (temp.length > 0) {
                    discounts[i].discount.forEach(discount => {
                        console.log(discount);
                    });
                }
            }
        }




        const total = this.state.purchaseCart.reduce( (accumulator, current) => {
            return current.displayPrice + accumulator;
        }, 0);

        this.setState({total})
    }

    handlePurchaseCart = (product) => {
        const cart = [...this.state.purchaseCart];
        const update = cart.findIndex((element) => {
            // console.log("PHOTO IDS");
            // console.log(element.photoId, product.photoId);
            // console.log(element.id, product.id);
            return element.photoId === product.photoId && element.id === product.id;
        });
        if (update === -1) {
            cart.push(product);
        } else {
            cart[update] = product;
        }

        this.setState({purchaseCart: cart}, () => {
            // console.log("STATE:" ,this.state);
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
    
    homeLinkHandler = () => {
        this.props.history.push('/');
    }


    
    render() {

        const cards = this.props.cart.map( (fav, i) => {
            const card =
                [<CardCart 
                    key                 = {i}
                    data                = {fav}
                    styles              = "card-3-mobile card-3-tablet card-3-desktop"
                    cardHandler         = {() => { return false;}}
                    favHandler          = {this.props.favHandler}
                    products            = {this.state.products}
                    cartHandler         = {null}
                    handleItemRemove    = {this.handleRemoveItem}
                    handlePurchaseCart  = {this.handlePurchaseCart}
                    discounts           = {this.state.discounts}
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
                    <p>{item.label} - {item.quantity} - ${item.displayPrice}</p>
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

