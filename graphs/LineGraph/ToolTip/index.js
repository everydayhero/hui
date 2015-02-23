"use strict";

var React   = require('react');

module.exports = React.createClass({
  displayName: 'ToolTip',

  propTypes: {
    position: React.PropTypes.object,
    show: React.PropTypes.bool,
    data: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      show: false,
      data: {},
      position: {
        x: 0,
        y: 0
      }
    };
  },

  render: function() {
    var props = this.props;
    var style = { left: props.position.x, top: props.position.y };
    if (!props.show) {
      return false;
    }

    return (
      <div className="ToolTip" style={ style }>
        I am a tip!
      </div>
    );
  }
});
