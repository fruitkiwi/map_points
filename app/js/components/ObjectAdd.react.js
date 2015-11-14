var React = require('react')

var ObjectActionCreators = require('../actions/ObjectActionCreators')

var ObjectAdd = React.createClass({
  
  propTypes: {
    currentPoint: React.PropTypes.object
  },
  
  render: function() {
    return (
      <div className="map-app__utils__object-section__add">
        <input type="text" key="0" className="text-input" ref="nameinput" />
        <input type="button" key="1" value="Add new object" className="button" onClick={this.handleAdd} />
      </div>
    )
  },
  
  handleAdd: function() {
    var name = this.refs.nameinput.value.trim()
    if (name === '')
      return
    this.refs.nameinput.value = ''
    ObjectActionCreators.createObject(name, this.props.currentPoint.id)
  }
  
})

module.exports = ObjectAdd