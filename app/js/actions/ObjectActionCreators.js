var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')

module.exports = {
  createObject: function(name, pointID) {
    name = name.trim()
    if (name === '') {
      console.log('trying to create object with empty name')
      return
    }
    MapAppDispatcher.dispatch({
      type: 'object-create',
      name: name,
      pointID: pointID
    })
  },
  
  updateObjectName: function(id, name) {
    name = name.trim()
    if (name === '') {
      console.log('trying to update object with empty name')
      return
    }
    MapAppDispatcher.dispatch({
      type: 'object-update-name',
      objID: id,
      name: name
    })
  },
  
  removeObject: function(id) {
    MapAppDispatcher.dispatch({
      type: 'object-remove',
      objID: id
    })
  },
  
  receiveObjects: function(objects) {
    MapAppDispatcher.dispatch({
      type: 'receive-objects',
      objects: objects || {}
    })
  }
  
}