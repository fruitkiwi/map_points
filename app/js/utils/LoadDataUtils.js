var PointActionCreators = require('../actions/PointActionCreators')
var ObjectActionCreators = require('../actions/ObjectActionCreators')

module.exports = {
  getData: function() {
    var objects = localStorage.getItem('objects')
    var points = localStorage.getItem('points')
    try {
      objects = JSON.parse(objects)
      points = JSON.parse(points)
      PointActionCreators.receivePoints(points)
      ObjectActionCreators.receiveObjects(objects)
    }
    catch (e) {
      console.log('error parsing data from localstorage')
    }
  },
  
  setData: function(points, objects) {
    localStorage.setItem('points', JSON.stringify(points))
    localStorage.setItem('objects', JSON.stringify(objects))
  }
  
}