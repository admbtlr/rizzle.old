/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';

// Routes
import Routes from './common/components/Routes';

// Base styling
import './common/base.css';


window.startApp = function() {
  // ID of the DOM element to mount app on
  const DOM_APP_EL_ID = 'app';
  let history = browserHistory;

  if (window.cordova) {
    history = hashHistory;
  }

  // Render the router
  ReactDOM.render((
    <Router history={history}>
      {Routes}
    </Router>
  ), document.getElementById(DOM_APP_EL_ID));
}

if (!window.cordova) {
  window.startApp()
}