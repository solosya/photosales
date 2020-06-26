//Libraries
import React, { Component } from 'react'
import {connect}            from 'react-redux'
import {withRouter}         from 'react-router'
import axios                from 'axios'
import qs                   from 'qs'

// import PropTypes            from 'prop-types'

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
        username: "",
        password:"",
        email: "",
        forgot: false,
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
        this.props.login({...this.state}, this.props.history);
    }

    guest = () => {
        this.props.guest(this.props.history);
    }

    forgotHandler = () => {
        axios.post('/api/auth/forgot-password', qs.stringify({email:this.state.email})).then((r) => {
            if (r.success === 1) {
                this.setState({forgot:false});
            }
        }).catch(() => {
            this.setState({forgot:false});
        });
    }

    renderForgotHandler = () => {
        this.setState({forgot:true});
    }

    render() {


            
        const cards = this.props.cart.map( (product, i) => {

            const card =
                <Card 
                    key         = {i}
                    data        = {product}
                    styles      = {["ps-card-5-mobile", "ps-card-2-tablet", "ps-card-2-desktop"]}
                    cardHandler = {() => { return false;}}
                    favHandler  = {this.props.favHandler}
                    cartHandler = {this.props.cartHandler}
                    galleryButtons = {false}
                    favourite
                ></Card>

            return card;
        });



        return (
            <Container>
        

                <Row>
                    <Col classes={["col-12", "col-md-12", "col-lg-10", "col-xl-8"]}>

                        <Row>
                            <Col classes={["col-12"]}>
                                <LoginPanel 
                                    email               = {this.state.email}
                                    username            = {this.state.username}
                                    password            = {this.state.password}
                                    renderForgot        = {this.state.forgot}
                                    loginHandler        = {this.login} 
                                    guestHandler        = {this.guest}
                                    forgotHandler       = {this.forgotHandler}
                                    loginFormHandler    = {this.loginForm}
                                    renderForgotHandler = {this.renderForgotHandler}
                                />
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
        tempLoggedIn: state.tempLoggedIn,
        pageTitle: state.pageTitle


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
