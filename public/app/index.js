import "babel-polyfill";
//import 'font-awesome/css/font-awesome.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, applyRouterMiddleware, IndexRoute } from 'react-router';
import useScroll from 'react-router-scroll';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import App from './containers/App';
import configureStore from './store/configureStore';
import Dashboard from './containers/Dashboard'

const store = configureStore();

const routes = (
 <Route path="/" component={App} >
    <IndexRoute component={Dashboard}/>
  </Route>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
