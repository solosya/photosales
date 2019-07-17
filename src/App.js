import React, { Component } from 'react';
import {Route}             from 'react-router-dom';
import { AnimatedSwitch }   from 'react-router-transition';
import Home                 from './containers/home/home';
import Checkout             from './containers/checkout/checkout';
import axios                from 'axios';
import './app.scss';
// _appJsConfig

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = window.vigblat;
axios.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded';
delete window.vigblat;

const urlPath = window.location.pathname.split("/");

if (urlPath[1] === 'page') {
    window.layoutTemplate = urlPath[1] + '/' + urlPath[2] || 'photos';
} else {
    window.layoutTemplate = urlPath[1] || 'photos';
}

class App extends Component {

    pageClicked = () => {
        // console.log('page clicked');
    }

    render() {
        return (
            <div onClick={this.pageClicked}>
                <AnimatedSwitch
                      atEnter={{ opacity: 0 }}
                      atLeave={{ opacity: 0 }}
                      atActive={{ opacity: 1 }}
                      className="switch-wrapper"
                >
                    <Route path={"/" + window.layoutTemplate + "/checkout"} component={Checkout} />
                    <Route path={"/" + window.layoutTemplate} component={Home} />
                    <Route path="/" component={Home} />
                </AnimatedSwitch>
            </div>
        );
    }
}

export default App;
