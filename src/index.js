import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import {rootReducer} from "./store/reducers";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app';
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));

registerServiceWorker();
