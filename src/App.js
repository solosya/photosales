import React, { Component } from 'react';
import {Route, Switch}             from 'react-router-dom';
import Home                 from './containers/home/home';
import Checkout             from './containers/checkout/checkout';
import axios                from 'axios';

// _appJsConfig

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = window.vigblat;
axios.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded';
delete window.vigblat;

console.log("what now?");

const urlPath = window.location.pathname.split("/");
if (urlPath[1] === 'page') {
    console.log('now1')
    window.layoutTemplate = urlPath[1] + '/' + urlPath[2] || 'photos';
} else {
    console.log('now2')
    console.log(urlPath);
    window.layoutTemplate = urlPath[1];
}

console.log(window.layoutTemplate);

class App extends Component {

    pageClicked = () => {
        console.log('page clicked');
    }

    render() {
        return (
            <div onClick={this.pageClicked}>
                <Switch>
                    <Route path={"/" + window.layoutTemplate + "/checkout"} component={Checkout} />
                    <Route path={"/" + window.layoutTemplate} component={Home} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
