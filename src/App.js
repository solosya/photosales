import React, { Component } from 'react';
import {Route, Switch}             from 'react-router-dom';
import Home                 from './containers/home/home';
import Checkout             from './containers/checkout/checkout';
import axios                from 'axios';

// _appJsConfig

axios.defaults.baseURL = window.location.href;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = window.vigblat;
axios.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded';
delete window.vigblat;

class App extends Component {

    pageClicked = () => {
        console.log('page clicked');
    }

    render() {
        return (
            <div onClick={this.pageClicked}>
                <Switch>
                    <Route path="/photo/checkout" component={Checkout} />
                    <Route path="/photo" component={Home} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
