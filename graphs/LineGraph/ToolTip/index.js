"use strict";

var _            = require('lodash');
var React        = require('react');
var cx           = require('react/lib/cx');
var moment       = require('moment');
var formatNumber = require('../../../lib/formatNumber');

module.exports = React.createClass({
  displayName: 'ToolTip',

  propTypes: {
    position: React.PropTypes.object,
    show: React.PropTypes.bool,
    data: React.PropTypes.object,
    label: React.PropTypes.string,
    isFlipOver: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      show: false,
      data: {},
      label: null,
      isFlipOver: false,
      position: {
        x: 0,
        y: 0
      }
    };
  },

  renderDotLine: function() {
    var pathData;

    if (this.props.isFlipOver) {
      pathData = "M190 100 L190 0";
    } else {
      pathData = "M10 100 L10 0";
    }

    return (
      <svg className="ToolTip__svg">
        <g>
          <path
            d={ pathData }
            stroke="black"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1, 2" />
        </g>
      </svg>
    );
  },

  renderTipContent: function() {
    var props   = this.props;
    var data    = props.data;
    var date, content, classes;

    classes = cx({
      "ToolTip__text": true,
      "ToolTip__text--left": !props.isFlipOver,
      "ToolTip__text--right": props.isFlipOver,
    });

    if (_.isEmpty(data)) {
      return false;
    } else {
      date    = moment(data.date).format("ddd MMM DD, YYYY");
      content = props.label + ": " + formatNumber(data.value) + " of " + formatNumber(data.total);

      return (
        <div className={ classes } >
          <p>{ date }</p>
          <p>{ content }</p>
        </div>
      );
    }
  },

  render: function() {
    var props    = this.props;
    var position = props.position;
    var x        = position.x;
    var y        = position.y;
    var style    = { left: x, top: y };
    var classes  = cx({
      "ToolTip": true,
      "ToolTip--left": props.isFlipOver
    });

    if (!props.show) {
      return false;
    }

    return (
      <div className={ classes } style={ style }>
        { this.renderDotLine() }
        { this.renderTipContent() }
      </div>
    );
  }
});
