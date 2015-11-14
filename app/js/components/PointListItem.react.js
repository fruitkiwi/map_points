var React = require('react')
var PointActionCreators = require('../actions/PointActionCreators')

var PointListItem = React.createClass({
  propTypes: {
    point: React.PropTypes.object,
    currentPoint: React.PropTypes.object
  },
  
  getInitialState: function() {
    return ({
      editing: false
    })
  },
  
  render: function() {
    var point = this.props.point
    var desc = this.state.editing ?
      <input type="text" defaultValue={point.desc} className="text-input" ref="descinput" />
      :
      <span>{point.desc}</span>
    
    var className = 'map-app__utils__point-list__item'
    if (this.props.currentPoint && this.props.currentPoint.id === point.id)
      className += ' map-app__utils__point-list__item--active'
      
    var editClassName = 'map-app__utils__point-list__item__edit' + (this.state.editing ? ' map-app__utils__point-list__item__edit--ok' : '')
    
    return (
      <div className={className}>
        <div className="map-app__utils__point-list__item__coords" onClick={this.handleSelect}>
          {'( ' + point.coords.lat + ' , ' + point.coords.lng + ' )'}
        </div>
        <div className="map-app__utils__point-list__item__desc">
          {desc}
        </div>
        <div className={editClassName} onClick={this.handleChange}>
        </div>
        <div className="map-app__utils__point-list__item__delete" onClick={this.handleDelete}>
        </div>
      </div>
    )
  },
  
  handleChange: function(e) {
    e.stopPropagation()
    var editing = this.state.editing
    if (editing) {
      let id = this.props.point.id
      let desc = this.refs.descinput.value.trim()
      PointActionCreators.updatePointDesc(id, desc)
      this.setState({editing: false})
    }
    else
      this.setState({editing: true})
  },
  
  handleDelete: function(e) {
    e.stopPropagation()
    PointActionCreators.removePoint(this.props.point.id)
  },
  
  handleSelect: function() {
    PointActionCreators.togglePointSelection(this.props.point.id)
  }
  
})

module.exports = PointListItem