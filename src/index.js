import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import myReducer from './reducers/index';

const store = createStore(
    myReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

    );

ReactDOM.render(
<Provider store = {store}>
    <App/>
</Provider>, 
document.getElementById('root')
);
serviceWorker.unregister();
    