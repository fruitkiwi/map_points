var React = require('react')
var ReactDOM = require('react-dom')

var MapApp = require('./components/MapApp.react')
var LoadDataUtils = require('./utils/LoadDataUtils')

LoadDataUtils.getData()

ReactDOM.render(
  <MapApp />,
  document.getElementById('app')
)