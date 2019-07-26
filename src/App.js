//Libraries
import React, { Component }     from 'react'
import { Route, Switch }        from 'react-router-dom'
import { withRouter }           from 'react-router'
import axios                    from 'axios'

//Components
import Home                     from './containers/home/home'
import store                    from './store/store'
import Login                    from './containers/login/login'
import Checkout                 from './containers/checkout/checkout'
import EnsureLoggedInContainer  from './containers/private'

//Actions
import * as actionTypes         from './store/actions/actions'

//Styles
import './app.scss';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = window.vigblat;
axios.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type']        = 'application/x-www-form-urlencoded';
delete window.vigblat;


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
        hasAccess:  (true === (window._appJsConfig.userHasBlogAccess === 1)),
        live: true,
        pageTitle: window.pageTitle
    });
}


class App extends Component {


    linkHandler = (page) => {
        if (page === false) return;
        if (typeof page === 'undefined') page = "";
        this.props.history.push(window.basePath + page);
    }

    checkFavouriteStatus = (photoid, favourites) => {
        const found = favourites.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    checkCartStatus = (photoid, cart) => {
        const found = cart.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    photoStatusHandler = (photoid, favourites, cartItems) => {
        const favourite = this.checkFavouriteStatus(photoid, favourites);
        const cart = this.checkCartStatus(photoid, cartItems);
        return {favourite, cart};
    }


    render() {
        return (
            <div style={{marginBottom: "60px"}}>
                <Switch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >
                    <Route path={window.basePath + "/login"} render={ () => 
                        <Login linkHandler={this.linkHandler} />
                    } />

                    <Route path={window.basePath + "/checkout"} render={ () => 
                        <EnsureLoggedInContainer>
                            <Checkout linkHandler={this.linkHandler}/> 
                        </EnsureLoggedInContainer> 
                    } />

                    {/* <Route path={window.basePath + "/search"} render={ () => 
                        <Search linkHandler={this.linkHandler}
                                photoStatusHandler={this.photoStatusHandler} 
                        />
                    } /> */}

                    <Route path={window.basePath + "/search"} render={ () => 
                        <Home linkHandler={this.linkHandler}
                                photoStatusHandler={this.photoStatusHandler} 
                        />
                    } />



                    <Route path={window.basePath + "/:section"} render={ () => 
                        <Home   linkHandler={this.linkHandler}
                                photoStatusHandler={this.photoStatusHandler} 
                            />
                        } />
                    
                    <Route path={window.basePath} render={ () => 
                        <Home   linkHandler={this.linkHandler} 
                                photoStatusHandler={this.photoStatusHandler} 
                            />
                        } />


                        
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
