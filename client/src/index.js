import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App';
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./store/reducers";

import regMiddleware from "./store/middlewares/regMiddleware";
import {watchSaga} from './store/saga';
import loginMiddleware from "./store/middlewares/loginMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(sagaMiddleware, regMiddleware, loginMiddleware)));

sagaMiddleware.run(watchSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

