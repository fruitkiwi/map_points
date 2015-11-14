var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')

module.exports = {
  createObject: function(name, pointID) {
    var objName = name.trim()
    if (objName === '') {
      console.log('trying to create object with empty name')
      return
    }
    MapAppDispatcher.dispatch({
      type: 'object-create',
      name: objName,
      pointID: pointID
    })
  },
  
  updateObjectName: function(id, name) {
    var objName = name.trim()
    if (objName === '') {
      console.log('trying to update object with empty name')
      return
    }
    MapAppDispatcher.dispatch({
      type: 'object-update-name',
      objID: id,
      name: objName
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