var React = require('react')

var PointStore = require('../stores/PointStore')
var ObjectStore = require('../stores/ObjectStore')

var LoadDataUtils = require('../utils/LoadDataUtils')

var PointList = require('../components/PointList.react')
var ObjectSection = require('../components/ObjectSection.react')
var Map = require('../components/Map.react')

function getState() {
  return {
    currentPoint: PointStore.getCurrentPoint(),
    points: PointStore.getAll(),
    objects: ObjectStore.getAllObjectsForCurrentPoint() 
  }
}

var MapApp = React.createClass({
  
  getInitialState: function() {
    return getState()
  },
  
  componentWillMount: function() {
    LoadDataUtils.getData()
    this.setState(getState())
  },
  
  componentDidMount: function() {    
    PointStore.addChangeListener(this._onChange)
    ObjectStore.addChangeListener(this._onChange)
    
    window.addEventListener('unload', function() {
      var points = PointStore.getAllHash()
      var objects = ObjectStore.getAll()
      LoadDataUtils.setData(points, objects)
    })
  },
  
  componentWillUnmount: function() {
    PointStore.removeChangeListener(this._onChange)
    ObjectStore.removeChangeListener(this._onChange)
 },
  
  render: function() {
    var state = this.state
    return (
      <div className="map-app">
        <Map points={state.points} currentPoint={state.currentPoint} />
        <div className="map-app__utils">
          <PointList points={state.points} currentPoint={state.currentPoint} />
          <ObjectSection objects={state.objects} currentPoint={state.currentPoint} />
        </div>
      </div>
    )
  },
  
  _onChange: function() {
    this.setState(getState())
  }
  
})

module.exports = MapApp