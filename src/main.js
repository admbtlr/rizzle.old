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
import rizzle from './redux/reducers.js'
import App from './components/App.js'

// Base styling
import './common/base.css';


window.startApp = function() {
  let store = createStore(rizzle)

  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app'))
}

if (!window.cordova) {
  window.startApp()
}