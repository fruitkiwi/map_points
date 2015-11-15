var React = require('react')

var PointActionCreators = require('../actions/PointActionCreators')

function drawMapControls() {
  var tempMarker = new google.maps.Marker({
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 3
      },
      draggable: true
  })
    
  tempMarker.addListener('dragend', function(e) {
      this.latLng = e.latLng
  })
    
  var input = document.createElement('input')
  input.type = 'text'
  input.className = 'text-input'
    
  var button = document.createElement('input')
  button.type = 'button'
  button.className = 'button'
  button.value = 'Add point'
    
  var cancel = document.createElement('input')
  cancel.type = 'button'
  cancel.className = 'button'
  cancel.value = 'Cancel'
    
  function hideControls() {
    input.value = ''
    div.classList.add('hidden')
    tempMarker.setMap(null)
  }
    
  button.addEventListener('click', function() {
    this.handleAdd(
      {lat: tempMarker.latLng.lat(), lng: tempMarker.latLng.lng()},
      input.value.trim()
    )
    hideControls()
  }.bind(this))
  cancel.addEventListener('click', hideControls)
    
  var div = document.createElement('div')
  div.className = 'map-app__map__inputs-container'
  div.appendChild(input)
  div.appendChild(button)
  div.appendChild(cancel)
  div.index = 1
  div.classList.add('hidden')
    
  this.mapObject.controls[google.maps.ControlPosition.TOP_RIGHT].push(div)
    
  this.mapObject.addListener('click', function(e) {
    if (div.classList.contains('hidden'))
      div.classList.remove('hidden')
    tempMarker.setPosition(e.latLng)
    tempMarker.setMap(this)
    tempMarker.latLng = e.latLng
  })
}

var Map = React.createClass({
  
  propTypes: {
    points: React.PropTypes.array,
    currentPoint: React.PropTypes.object
  },
  
  componentDidMount: function() {
    this.mapObject = new google.maps.Map(this.refs.map, {
      center: {lat: 56.837230, lng: 60.597633},
      zoom: 8,
      disableDefaultUI: true
    })
    this.markers = {}
    
    drawMapControls.apply(this)
    
    this.drawPoints()
    
  },
  
  componentDidUpdate: function() {
    this.drawPoints()
    this.centerMap()
  },
  
  render: function() {
    return (
      <div className="map-app__map" ref="map">
      </div>
    )
  },
  
  handleAdd: function(coords, desc) {
    PointActionCreators.createPoint(coords, desc)
  },
  
  drawPoints: function() {
    function markerClickHandler() {
      PointActionCreators.togglePointSelection(this.pointID)
    }
    function placeMarker(point, map) {
      var marker = new google.maps.Marker({
            position: point.coords,
            map: map,
            pointID: point.id
      })
      markers[point.id] = marker
      marker.addListener('click', markerClickHandler)
    }

    var markersToSave = {}
    var markers = this.markers
    
    this.props.points.forEach(function(point) {
      if (!markers[point.id])
        placeMarker(point, this.mapObject)
      markersToSave[point.id] = true
    }.bind(this))
    
    for (let pointID in markers) {
      if (!markersToSave[pointID])
        markers[pointID].setMap(null)
    }
  },
  
  centerMap: function() {
    var point = this.props.currentPoint
    if (point)
      this.mapObject.setCenter(point.coords)
  }
  
})

module.exports = Map