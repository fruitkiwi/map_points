var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')
var EventEmitter = require('events').EventEmitter

var _points = {}
var _currentPointID = null

function genID() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
}

function init(points) {
  _points = points
}

function create(coords, desc) {
  var id = genID()
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
    orderedPoints.sort(function(a, b) {
      if (a.created < b.created)
        return -1
      else if (a.created > b.created)
        return 1
      return 0
    })
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
      _currentPointID = action.pointID
      PointStore.emitChange()
      break
      
    case 'point-unselected':
      _currentPointID = null
      PointStore.emitChange()
      break
      
    case 'receive-points':
      init(action.points)
      PointStore.emitChange()
      break
  }
})

module.exports = PointStore