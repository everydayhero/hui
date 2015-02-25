"use strict";

var _            = require('lodash');
var React        = require('react');
var moment       = require('moment');
var formatNumber = require('../../../lib/formatNumber');

module.exports = React.createClass({
  displayName: 'ToolTip',

  propTypes: {
    position: React.PropTypes.object,
    show: React.PropTypes.bool,
    data: React.PropTypes.object,
    label: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      show: false,
      data: {},
      label: null,
      position: {
        x: 0,
        y: 0
      }
    };
  },

  renderDotLine: function() {
    return (
      <svg className="ToolTip__svg">
        <g className="ToolTip__line">
          <path
            d="M10 100 L10 0"
            stroke="black"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1, 2" />
        </g>
      </svg>
    );
  },

  renderTipContent: function() {
    var props  = this.props;
    var data   = props.data;
    var date, content;

    if (_.isEmpty(data)) {
      return false;
    } else {
      date    = moment(data.date).format("ddd MMM DD, YYYY");
      content = props.label + ": " + formatNumber(data.value) + " of " + formatNumber(data.total);

      return (
        <div className="ToolTip__text" >
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
    if (!props.show) {
      return false;
    }

    return (
      <div className="ToolTip" style={ style }>
        { this.renderDotLine() }
        { this.renderTipContent() }
      </div>
    );
  }
});
