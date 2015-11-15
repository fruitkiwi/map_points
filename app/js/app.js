require('babel-polyfill')

var React = require('react')
var ReactDOM = require('react-dom')

var MapApp = require('./components/MapApp.react')

ReactDOM.render(
  <MapApp />,
  document.getElementById('app')
)