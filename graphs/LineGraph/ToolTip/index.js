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
    var props    = this.props;
    var position = props.position;
    var x        = position.x;
    var y        = position.y;
    var style    = { left: x, top: y };
    if (!props.show) {
      return false;
    }

    return (
      <div className="ToolTip" style={ style }>
        <svg className="ToolTip__svg" >
          <g
            className="ToolTip__circle"
            transform={ "translate(" + position.x + ", " + position.y + ")" } >

          </g>
        </svg>

        <div className="ToolTip__text" >
          This is the tip!
        </div>
      </div>
    );
  }
});
