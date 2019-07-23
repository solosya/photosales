//Libraries
import React, { Component } from 'react';
import { Route }            from 'react-router-dom';
import { withRouter }       from 'react-router';
import { AnimatedSwitch }   from 'react-router-transition';
import axios                from 'axios';

//Components
import Home                     from './containers/home/home';
import Checkout                 from './containers/checkout/checkout';
import Login                    from './containers/login/login';
import store                    from './store/store';
import EnsureLoggedInContainer  from './containers/private';

//Actions
import * as actionTypes     from './store/actions/actions';


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
    window.layoutTemplate = urlPath[1] + '/' + urlPath[2] || 'photos';
} else {
    window.layoutTemplate = urlPath[1] || 'photos';
}


if (window._appJsConfig) {
    console.log(window._appJsConfig);
    store.dispatch({
        type: actionTypes.LOGIN_ON_REFRESH, 
        isLoggedIn: true === window._appJsConfig.isUserLoggedIn === 1, 
        hasAccess: true === window._appJsConfig.userHasBlogAccess === 1
    });
}


class App extends Component {


    linkHandler = (page) => {
        if (typeof page === 'undefined') page = "";
        this.props.history.push("/"+window.layoutTemplate + page);
    }

    render() {
        return (
            <div>
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >

                    <Route path="/login" component={Login} />

                    <Route path={"/" + window.layoutTemplate + "/checkout"} render={ () => 
                        <EnsureLoggedInContainer>
                            <Checkout linkHandler={this.linkHandler}/> 
                        </EnsureLoggedInContainer> 
                    } />

                    <Route path={"/" + window.layoutTemplate + "/:section"} render={ () => 
                        <Home linkHandler={this.linkHandler}/>} />
                    
                    <Route path="/" render={ () => 
                        <Home linkHandler={this.linkHandler}/>} />


                        
                </AnimatedSwitch>
            </div>
        );
    }
}

export default withRouter(App);
