/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill'

// Libraries
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore.js'
import { itemsFetchData } from './redux/actions/items.js'
import App from './components/App.js'

// Base styling
import './common/base.css'

let store = window.store = {}

const startApp = window.startApp = function () {
  store = configureStore()

  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app'))

  document.addEventListener('resume', function () {
    store.dispatch(itemsFetchData())
  }, false)
}

const fetchItems = window.fetchItems = function () {
  store.dispatch(itemsFetchData())
}

document.addEventListener('deviceready', startApp, false)

if (!window.cordova) {
  window.startApp()
}
