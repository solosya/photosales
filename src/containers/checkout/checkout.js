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
        total: 0,
        plans: {
            discounts: {
                digital: {
                    commercial: {
                        prices : {
                            "1": 50,
                            "2": 30,
                            "6": 20
                        }
                    },
                    personal: {
                        prices : {
                            "1": 20,
                            "2": 15,
                            "6": 10
                        }
                    }
                }
            },
            digital: [
                {
                    label: 'Personal or single use',
                    price : 20
                },
                {
                    label: 'Commercial use',
                    prices : 50
                },
            ],
            print: [
                {
                    label: '6" x 4" ($5, additional copies $2)',
                    prices :{
                        "1": 5,
                        "2": 2,
                    }
                },
                {
                    label: '7" x 5" ($7, additional copies $2)',
                    prices :{
                        "1": 7,
                        "2": 2,
                    }
                },
                {
                    label: '8" x 6" ($7, additional copies $2)',
                    prices :{
                        "1": 7,
                        "2": 2,
                    }
                }
            ]

        }
    }


    calculate = () => {

    }



    homeLinkHandler = () => {
        this.props.history.push('/');
    }




    render() {
        console.log(this.props);


        const cards = this.props.cart.map( (fav, i) => {
            const card =
                [<CardCart 
                    key={i}
                    data={fav}
                    styles="card-3-mobile card-3-tablet card-3-desktop"
                    cardHandler={() => { return false;}}
                    favHandler={this.props.favHandler}
                    plans={this.state.plans}
                    cartHandler={null}
                    favourite
                ></CardCart>];
            
            // add a divider beneath each card except the last
            if (i !== this.props.cart.length -1) {
                card.push( <Divider key={i+'div'}/>)
            }

            return card;
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

