import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import {loadState, saveState} from "./localStorage";
import registerServiceWorker from './registerServiceWorker';
import throttle from 'lodash/throttle';
import reducers from './reducers/index';

const persistedState = loadState();
const initialState = Object.assign({},persistedState);

let store = createStore(reducers, initialState);

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
