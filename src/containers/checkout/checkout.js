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
        products: {
            print: [
                {
                    label: '6" x 4" ($5, additional copies $2)',
                    price : 5,
                    id: 3
                },
                {
                    label: '7" x 5" ($7, additional copies $2)',
                    price : 6,
                    id: 4
                },
                {
                    label: '8" x 6" ($7, additional copies $2)',
                    price : 7,
                    id: 5
                }
            ],
            digital: [
                {
                    label: 'Personal or single use',
                    price : 20
                },
                {
                    label: 'Commercial use',
                    prices : 50
                },
            ]

        },
        discounts: {

        }
    }


    calculate = () => {

    }

    handlePurchaseCart = (product) => {
        const cart = [...this.state.purchaseCart];

        const update = cart.findIndex((element) => {
            // console.log(element.photoId, element.productId);
            // console.log(product.photoId, product.productId);
            return element.photoId === product.photoId && element.productId === product.productId;
        });

        if (update === -1) {
            cart.push(product);
        } else {
            cart[update] = product;
        }
        this.setState({purchaseCart: cart}, () => {
            console.log(this.state);
        });
    }

    homeLinkHandler = () => {
        this.props.history.push('/');
    }




    render() {
        // console.log(this.props);

        console.log(this.props.cart);
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
                    handlePurchaseCart  = {this.handlePurchaseCart}
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
                    <p>{item.label} - {item.quantity}</p>
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

