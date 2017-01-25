import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/app';
import routes from './routes/';
import { routerMiddleware, push } from 'react-router-redux'
import createLogger from 'redux-logger';
import {loginUserSuccess} from './actions';

let createStoreWithMiddleware;

let middleware = applyMiddleware(
  thunk,
  createLogger(),
  routerMiddleware(browserHistory)
);

const store = createStore(
  reducers,
  middleware
);

const history = syncHistoryWithStore(browserHistory, store)

let access_token = localStorage.getItem('access_token');
if (access_token !== null) {
    store.dispatch(loginUserSuccess(access_token));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app'));