var React = require('react')

var PointListItem = require('../components/PointListItem.react')

var PointList = React.createClass({
  
  propTypes: {
    points: React.PropTypes.array,
    currentPoint: React.PropTypes.object
  },
  
  render: function() {
    var PointListItems = this.props.points.map(function(point) {
      return (
        <PointListItem key={point.id} point={point} currentPoint={this.props.currentPoint} />
      )
    }.bind(this))
    return (
      <div className="map-app__utils__point-list">
        {PointListItems}
      </div>
    )
  }
  
})

module.exports = PointList