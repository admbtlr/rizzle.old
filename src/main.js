/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './redux/store/configureStore.js'
import App from './components/App.js'

// Base styling
import './common/base.css';


window.startApp = function() {
  const store = configureStore()

  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app'))
}

if (!window.cordova) {
  window.startApp()
}