var React = require('react')

var ObjectList = require('../components/ObjectList.react')
var ObjectAdd = require('../components/ObjectAdd.react')

var ObjectSection = React.createClass({
  
  propTypes: {
    objects: React.PropTypes.array,
    currentPoint: React.PropTypes.object
  },
  
  render: function() {
    if (this.props.currentPoint)
      return (
        <div className="map-app__utils__object-section">
          <ObjectAdd currentPoint={this.props.currentPoint} />
          <ObjectList objects={this.props.objects} />
        </div>
      )
    else
      return false
  }
  
})

module.exports = ObjectSection