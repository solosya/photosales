import React, { Component } from 'react';
import Home                 from './containers/home/home';
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
                <Home />
            </div>
        );
    }
}

export default App;
