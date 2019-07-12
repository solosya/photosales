import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Store from './store/store';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

// const middle = store => {
//     return next => {
//         return action => {
//             const result = next(action);
//             return result;
//         }
//     }
// }



const elem = document.getElementById('photo-sales');

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    elem
);
