import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);

const elem = document.getElementById('photo-sales');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    elem
);
