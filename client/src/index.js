import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App';
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import headerReducer from "./store/reducers/headerReducer";
import loginReducer from "./store/reducers/loginReducer";
import dataBaseReducer from "./store/reducers/dataBaseReducer";
import regMiddleware from "./store/regMiddleware";
import {watchSaga} from './store/saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  dataBase: dataBaseReducer,
  header: headerReducer,
  login: loginReducer
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware, regMiddleware)));
sagaMiddleware.run(watchSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

