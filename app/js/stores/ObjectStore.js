var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')
var EventEmitter = require('events').EventEmitter
var PointStore = require('../stores/PointStore')

var _objects = {}
var _createdID = null

function genID() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
}

function create(name, pointID) {
  _createdID = genID()
  _objects[_createdID] = {
    id: _createdID,
    name: name,
    pointID: pointID,
    created: Date.now()
  }
}

function updateName(id, name) {
  if (!_objects[id]) {
    console.log('trying to update name in object with invalid id')
    return
  }
  _objects[id].name = name
}

function remove(id) {
  if(!_objects[id]) {
    console.log('trying to remove object with invalid id')
    return
  }
  delete _objects[id]
}

function removeObjectsForPoint(pointID) {
  for (let id in _objects) {
    if (_objects[id].pointID === pointID)
      remove(id)
  }
}

var ObjectStore = Object.assign({}, EventEmitter.prototype, {
  init: function(objects) {
    _objects = objects
  },
  
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
    return _objects
  },
  
  getAllObjectsForCurrentPoint: function() {
    var objectsForPoint = [],
        currentPoint = PointStore.getCurrentPoint()
    if (currentPoint) {
      let pointID = currentPoint.id
      for (let id in _objects) {
        let obj = _objects[id]
        if (obj.pointID === pointID)
          objectsForPoint.push(obj) 
      }
      objectsForPoint.sort(function(a, b) {
        if (a.created < b.created)
          return -1
        else if (a.created > b.created)
          return 1
        return 0
      })
    }
    return objectsForPoint
  },
  
  getCreatedID: function() {
    return _createdID
  }
  
})

ObjectStore.dispatchToken = MapAppDispatcher.register(function(action) {
  switch(action.type) {
    case 'object-create':
      create(action.name, action.pointID)
      ObjectStore.emitChange()
      break
      
    case 'object-update-name':
      updateName(action.objID, action.name)
      ObjectStore.emitChange()
      break
      
    case 'object-remove':
      remove(action.objID)
      ObjectStore.emitChange()
      break
      
    case 'point-remove':
      MapAppDispatcher.waitFor([PointStore.dispatchToken])
      removeObjectsForPoint(action.pointID)
      ObjectStore.emitChange()
      break
    
    case 'point-selected':  
      MapAppDispatcher.waitFor([PointStore.dispatchToken])
      ObjectStore.emitChange()
      break
    
    case 'point-unselected':
      MapAppDispatcher.waitFor([PointStore.dispatchToken])
      ObjectStore.emitChange()
      break
    
    case 'receive-objects':
      ObjectStore.init(action.objects)
      ObjectStore.emitChange()
      break
  }
})

module.exports = ObjectStore