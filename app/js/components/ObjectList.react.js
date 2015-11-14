var React = require('react')

var ObjectListItem = require('../components/ObjectListItem.react')

var ObjectList = React.createClass({
  
  propTypes: {
    objects: React.PropTypes.array
  },
  
  render: function() {
    var ObjectListItems = this.props.objects.map(function(object) {
      return (
        <ObjectListItem key={object.id} object={object}/>
      )
    })
    return (
      <div className="map-app__utils__object-section__object-list">
        {ObjectListItems}
      </div>
    )
  }
  
})

module.exports = ObjectList