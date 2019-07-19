//Libraries
import React, { Component } from 'react';
import { Route }            from 'react-router-dom';
import { withRouter }       from 'react-router';
import { AnimatedSwitch }   from 'react-router-transition';
import axios                from 'axios';

//Components
import Home                 from './containers/home/home';
import Checkout             from './containers/checkout/checkout';

//Styles
import './app.scss';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = window.vigblat;
axios.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type']       = 'application/x-www-form-urlencoded';
delete window.vigblat;

const urlPath = window.location.pathname.split("/");

if (urlPath[1] === 'page') {
    window.layoutTemplate = urlPath[1] + '/' + urlPath[2] || 'photos';
} else {
    window.layoutTemplate = urlPath[1] || 'photos';
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
                    <Route path={"/" + window.layoutTemplate + "/checkout"} render={ () => 
                        <Checkout linkHandler={this.linkHandler}/> } />
                    
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
