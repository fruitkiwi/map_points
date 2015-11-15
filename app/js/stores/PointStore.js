var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')
var EventEmitter = require('events').EventEmitter
var StoreUtils = require('../utils/StoreUtils')

var _points = {}
var _currentPointID = null

function init(points) {
  _points = points
}

function create(coords, desc) {
  var id = StoreUtils.genID()
  _points[id] = {
    id: id,
    coords: coords,
    desc: desc,
    created: Date.now()
  }
}

function updateDesc(id, desc) {
  if (!_points[id]) {
    console.log('trying to update point with invalid id')
    return
  }
  _points[id].desc = desc
}

function remove(id) {
  if (!_points[id]) {
    console.log('trying to remove point with invalid id')
    return
  }
  delete _points[id]
}

var PointStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit('change')
  },
  
  addChangeListener: function(callback) {
    this.on('change', callback)
  },
  
  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
  },
  
  getAll: function() {
    var orderedPoints = []
    for (let id in _points) {
      orderedPoints.push(_points[id])
    }
    StoreUtils.sort(orderedPoints)
    return orderedPoints
  },
  
  getAllHash: function() {
    return _points
  },
  
  getCurrentPoint: function() {
    return _points[_currentPointID]
  }
  
})

PointStore.dispatchToken = MapAppDispatcher.register(function(action) {
  switch(action.type) {
    case 'point-create':
      create(action.coords, action.desc)
      PointStore.emitChange()
      break
      
    case 'point-update-desc':
      updateDesc(action.pointID, action.desc)
      PointStore.emitChange()
      break
      
    case 'point-remove':
      _currentPointID = null
      remove(action.pointID)
      PointStore.emitChange()
      break
      
    case 'point-selected':
      var currentPoint = PointStore.getCurrentPoint()
      if (currentPoint && action.pointID === currentPoint.id)
        _currentPointID = null
      else
        _currentPointID = action.pointID
      PointStore.emitChange()
      break
      
    case 'receive-points':
      init(action.points)
      PointStore.emitChange()
      break
  }
})

module.exports = PointStore