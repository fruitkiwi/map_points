var React = require('react')
var ObjectActionCreators = require('../actions/ObjectActionCreators')

var ObjectListItem = React.createClass({
  
  propTypes: {
    object: React.PropTypes.object
  },
  
  getInitialState: function() {
    return ({
      editing: false
    })
  },
  
  render: function() {
    var object = this.props.object
    var name = this.state.editing ?
      <input type="text" defaultValue={object.name} className="text-input" ref="nameinput" />
      :
      <span>{object.name}</span>
    
    var editClassName = 'map-app__utils__object-section__object-list__item__edit' + (this.state.editing ? ' map-app__utils__object-section__object-list__item__edit--ok' : '')
    
    return (
      <div className="map-app__utils__object-section__object-list__item">
        <div className="map-app__utils__object-section__object-list__item__name">
          {name}
        </div>
        <div className={editClassName} onClick={this.handleChange}>
        </div>
        <div className="map-app__utils__object-section__object-list__item__delete" onClick={this.handleDelete}>
        </div>
      </div>
    )
  },
  
  handleChange: function() {
    var editing = this.state.editing
    if (editing) {
      let id = this.props.object.id
      let name = this.refs.nameinput.value.trim()
      if (name !== '') {
        ObjectActionCreators.updateObjectName(id, name)
        this.setState({editing: false})
      }
    }
    else
      this.setState({editing: true})
  },
  
  handleDelete: function() {
    ObjectActionCreators.removeObject(this.props.object.id)
  }
  
})

module.exports = ObjectListItem