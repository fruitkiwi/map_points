var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')

module.exports = {
  createPoint: function(coords, desc) {
    if (!coords || typeof(coords.lat) !== 'number' || typeof(coords.lng) !== 'number') {
      console.log('bad args in creating point')
      return
    }
    MapAppDispatcher.dispatch({
      type: 'point-create',
      coords: coords,
      desc: desc || ''
    })
  },
  
  updatePointDesc: function(id, desc) {
    MapAppDispatcher.dispatch({
      type: 'point-update-desc',
      pointID: id,
      desc: desc || ''
    })
  },
  
  removePoint: function(id) {
    MapAppDispatcher.dispatch({
      type: 'point-remove',
      pointID: id
    })
  },
  
  receivePoints: function(points) {
    MapAppDispatcher.dispatch({
      type: 'receive-points',
      points: points || {}
    })
  },
  
  togglePointSelection: function(id) {
    MapAppDispatcher.dispatch({
          type: 'point-selected',
          pointID: id
    })
  }
  
}