/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import FeedListContainer from "./containers/FeedList.js"
import ToolbarContainer from "./containers/Toolbar.js"

// Base styling
import './common/base.css';


window.startApp = function() {
  // Render the router
  ReactDOM.render((
    <div>
      <FeedListContainer />
      <ToolbarContainer />
    </div>
  ), document.getElementById('app'))
}

if (!window.cordova) {
  window.startApp()
}