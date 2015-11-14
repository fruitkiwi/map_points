var MapAppDispatcher = require('../dispatcher/MapAppDispatcher')
var PointStore = require('../stores/PointStore')

module.exports = {
  createPoint: function(coords, desc) {
    if (!coords || !coords.lat || !coords.lng || typeof(coords.lat) !== 'number' || typeof(coords.lng) !== 'number') {
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
    var currentPoint = PointStore.getCurrentPoint()
    if (currentPoint && id === currentPoint.id)
        MapAppDispatcher.dispatch({
          type: 'point-unselected',
          pointID: id
        })
    else
        MapAppDispatcher.dispatch({
          type: 'point-selected',
          pointID: id
        })
  }
  
}