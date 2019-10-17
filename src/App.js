//Libraries
import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import { Route, Switch }        from 'react-router-dom'
import { withRouter }           from 'react-router'
import axios                    from 'axios'

//Components
import Home                     from './containers/home/home'
import store                    from './store/store'
import Login                    from './containers/login/login'
import Admin                    from './containers/admin/admin'
import Checkout                 from './containers/checkout/checkout'
import Receipt                  from './containers/receipt/receipt'
import EnsureLoggedInContainer  from './containers/ensureLoggedIn'
import EnsureLoggedOutContainer from './containers/ensureLoggedOut'
import EnsureAdminContainer     from './containers/ensureAdmin'

import Row                      from './components/layout/row'
import Col                      from './components/layout/col'
import Container                from './components/layout/container'
import Modal                    from './components/modals/modal'
import Header                   from './components/partials/section_header.js'
import Gallery                  from './components/gallery/gallery'
import Favourites               from './components/favourites/favourites'




//Actions
import * as actionTypes         from './store/actions/actions'
import * as actionCreators      from './store/actions/actions'

//Styles
import './app.scss';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = window.csrfToken;
axios.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type']        = 'application/x-www-form-urlencoded';
delete window.csrfToken;


const urlPath = window.location.pathname.split("/");

if (urlPath[1] === 'page') {
    window.basePath = '/' + urlPath[1] + '/' + urlPath[2] || 'photos';
} else {
    window.basePath = '/' + urlPath[1] || 'photos';
}


if (window._appJsConfig) {

    store.dispatch({
        type: actionTypes.LOGIN_ON_REFRESH, 
        isLoggedIn: (true === (window._appJsConfig.isUserLoggedIn === 1)), 
        admin:  (true === (window._appJsConfig.userHasBlogAccess === 1)),
        live: true,
        pageTitle: window.pageTitle,
        stripeKey: window.stripePublic,
        env: window.env
    });
    
}


class App extends Component {
    
    state = {
        showGallery: false,
        galleryType: 'article',
        showFavourites : false,
        selectedGallery: null,
    }

    componentDidMount() {
        this.props.fetchFavourites();
    }


    linkHandler = (page) => {
        if (page === false) return;
        if (typeof page === 'undefined') page = "";
        this.props.history.push(window.basePath + page);
    }

    checkFavouriteStatus = (photoid) => {
        
        const found = this.props.favourites.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    checkCartStatus = (photoid) => {
        const found = this.props.cart.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    photoStatusHandler = (photoid) => {
        const favourite = this.checkFavouriteStatus(photoid);
        const cart = this.checkCartStatus(photoid);
        return {favourite, cart};
    }

    showGallery = (gallery) => {

        const galleryType = gallery.galleryType === 'photo' ? 'photo' : 'article';
        this.setState({
            selectedGallery: gallery,
            galleryType,
            showGallery: true,
            showFavourites : false
        }, () => {
            // console.log(this.state);
        });
        document.body.setAttribute('style', 'overflow: hidden;height:100%;')
    }

    closeGallery = () => {
        this.setState({
            showGallery: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;height:100%;')
    }


    showFavourites = () => {
        if (this.props.favourites.length > 0) {
            this.setState({
                showFavourites : true,
                showGallery: false,
            }, () => {
                // console.log(this.state);
            });
            document.body.setAttribute('style', 'overflow: hidden;height:100%;')
        }
    }
    closeFavourites = () => {
        this.setState({
            showFavourites: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;height:100%;')
    }



    render() {

        const gallery = 
            <Modal 
                width        = "954px" 
                // height       = "575px" 
                closeHandler = {this.closeGallery} 
                children     = { () => (
                    <Gallery 
                        gallery          = {this.state.selectedGallery} 
                        galleryType      = {this.state.galleryType}
                        favouriteHandler = {this.props.toggleFavourite}
                        checkPhotoStatus = {this.photoStatusHandler}
                        cartHandler      = {this.props.toggleCart}
                        admin            = {this.props.admin}
                    />
            )} >   
            </Modal>

        const favourites = 
            <Modal closeHandler={this.closeFavourites} children={ () => (
                <Favourites 
                    favourites  = {this.props.favourites}
                    cart        = {this.props.cart}
                    favHandler  = {this.props.toggleFavourite}
                    cartHandler = {this.props.toggleCart}
                    showGallery = {this.showGallery}
                    photoStatusHandler = {this.photoStatusHandler}
                />
            )} >   
            </Modal>

        const cartCount = (typeof this.props.cart !== 'undefined') ? this.props.cart.length : 0;
        const favCount = (typeof this.props.favourites !== 'undefined') ? this.props.favourites.length : 0;



        // return null;

        return (
            <div style={{marginBottom: "60px"}} data-env={this.props.env}>


                {this.state.showGallery     ? gallery : null}
                {this.state.showFavourites  ? favourites : null}

                <Container>
                    
                    <Row>
                        <Col classes={["col-12"]}>
                            <Header 
                                title               = {this.props.pageTitle} 
                                favourites          = {favCount}
                                cartItems           = {cartCount}
                                linkHandler         = {this.linkHandler}
                                favouritesHandler   = {this.showFavourites}
                                loggedIn            = {this.props.isLoggedIn}
                                larger 
                                cart
                            />
                        </Col>
                    </Row>
                </Container>



                <Switch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >


                    <Route path={window.basePath + "/admin"} render={ () => 
                        <EnsureAdminContainer>
                            <Admin  linkHandler={this.linkHandler} 
                                    photoStatusHandler={this.photoStatusHandler}
                            />
                        </EnsureAdminContainer>
                    } />


                    <Route path={window.basePath + "/login"} render={ () => 
                        <EnsureLoggedOutContainer>
                            <Login  linkHandler={this.linkHandler} 
                                    photoStatusHandler={this.photoStatusHandler}
                            />
                        </EnsureLoggedOutContainer>
                    } />

                    <Route path={window.basePath + "/checkout"} render={ () => 
                        <EnsureLoggedInContainer>
                            <Checkout   linkHandler={this.linkHandler} 
                                        photoStatusHandler={this.photoStatusHandler} 
                                        showGallery = {this.showGallery}

                            /> 
                        </EnsureLoggedInContainer>
                    } />

                    <Route path={window.basePath + "/search"} render={ () => 
                        <Home   linkHandler={this.linkHandler}
                                photoStatusHandler={this.photoStatusHandler} 
                                showGallery = {this.showGallery}
                        />
                    } />


                    <Route path={window.basePath + "/thanks"} render={ () => 
                        <Receipt    linkHandler={this.linkHandler} 
                                    photoStatusHandler={this.photoStatusHandler} 
                                    showGallery = {this.showGallery}
                            />
                        } />


                    <Route path={window.basePath + "/:section"} render={ () => 
                        <Home   linkHandler={this.linkHandler}
                                photoStatusHandler={this.photoStatusHandler} 
                                showGallery = {this.showGallery}
                            />
                        } />
                    




                    <Route path={window.basePath} render={ () => 
                        <Home   linkHandler={this.linkHandler} 
                                photoStatusHandler={this.photoStatusHandler} 
                                showGallery = {this.showGallery}
                            />
                        } />


                        
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        favourites  : state.favourites,
        cart        : state.cart,
        pageTitle   : state.pageTitle,
        isLoggedIn  : state.isLoggedIn,
        admin       : state.admin,
        env         : state.env,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCart      : (photo) => dispatch( actionCreators.toggleCart(photo) ),
        toggleFavourite : (photo) => dispatch( actionCreators.toggleFavourite(photo) ),
        fetchFavourites : ()      => dispatch( actionCreators.fetchSaved() ),
    }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App ) );
