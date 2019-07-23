//Libraries
import React, { Component } from 'react'
// import PropTypes            from 'prop-types'
import {connect}            from 'react-redux'
import {withRouter}         from 'react-router'
//Components
import Card                 from '../../components/card/card.js'
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Container            from '../../components/layout/container'
import Header               from '../../components/partials/section_header.js'
import LoginPanel           from '../../components/login/loginPanel'

//Actions
import * as actionCreators  from '../../store/actions/actions'



class LoginPage extends Component {

    state = {
        pageTitle: "Photo Sales",
        username: "",
        password:""
    }

    // static propTypes = {
    //     prop: PropTypes
    // }

    loginForm = (value, field) =>{
        this.setState({
            [field] : value
        })
    }

    login = () => {
        console.log('in the login handler');
        this.props.login({...this.state}, this.props.history);
    }

    guest = () => {
        console.log('guesting the guest');
        this.props.guest(this.props.history);

    }

    render() {


            
        const cards = this.props.cart.map( (product, i) => {

            const card =
                <Card 
                    key         = {i}
                    data        = {product}
                    styles      = "card-2-mobile card-2-tablet card-2-desktop"
                    cardHandler = {() => { return false;}}
                    favHandler  = {this.props.favHandler}
                    cartHandler = {this.props.cartHandler}
                    favourite
                ></Card>

            return card;
        });



        return (
            <Container>
        
                <Row>
                    <Col classes={["col-12"]}>
                        <Header 
                            title               = {this.state.pageTitle} 
                            cartItems           = {this.props.cart.length}
                            favourites          = {this.props.favourites.length}
                            linkHandler         = {this.props.linkHandler}
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
                                <LoginPanel 
                                    loginHandler={this.login} 
                                    loginFormHandler={this.loginForm}
                                    guestHandler={this.guest}/>
                            </Col>
                        </Row>
                    

                    { cards.length > 0 &&
                        <>
                            <Row margin="70px">
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
                                    { cards ? cards : null}
                                </Col>
                            </Row>
                        </>
                    }


                    </Col>
                </Row>
            </Container>
        )
    }
}



const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart,
        isLoggedIn: state.isLoggedIn,
        tempLoggedIn: state.tempLoggedIn

    }
};
const mapDispatchToProps = dispatch => {

    return {
        toggleFavourite: (photo)         => dispatch(actionCreators.toggleFavourite(photo)),
        toggleCart:      (photo)         => dispatch(actionCreators.toggleCart(photo)),
        guest:           (router)        => dispatch(actionCreators.guest(router)),
        login:           (user, router)  => dispatch(actionCreators.login(user, router)),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
