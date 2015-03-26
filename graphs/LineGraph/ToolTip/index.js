"use strict";

var _            = require('lodash');
var React        = require('react');
var Classnames   = require('classnames');
var moment       = require('moment');
var formatNumber = require('../../../lib/formatNumber');

module.exports = React.createClass({
  displayName: 'ToolTip',

  propTypes: {
    position: React.PropTypes.object,
    show: React.PropTypes.bool,
    data: React.PropTypes.object,
    label: React.PropTypes.string,
    isFlipOver: React.PropTypes.bool,
    totalFormat: React.PropTypes.string
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
      <svg className="hui-ToolTip__svg">
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
    var props = this.props;
    var data  = props.data;
    var date, content, classes;

    classes = Classnames({
      "hui-ToolTip__text--left": !props.isFlipOver,
      "hui-ToolTip__text--right": props.isFlipOver,
    }, "hui-ToolTip__text");

    if (_.isEmpty(data)) {
      return false;
    } else {
      date = moment(data.date).format("ddd MMM DD, YYYY");

      return (
        <div className={ classes } >
          <p className="hui-ToolTip__date" >{ date }</p>
          <p>
            { props.label + ": " }
            <span className="hui-ToolTip__value"> { formatNumber(data.value, props.totalFormat) } </span>
            { " / " }
            <span className="hui-ToolTip__total"> { formatNumber(data.total, props.totalFormat) } </span>
          </p>
        </div>
      );
    }
  },

  render: function() {
    var props    = this.props;
    var position = props.position;
    var x        = position.x;
    var y        = position.y;
    var style    = { left: x, top: y - 3 };

    var classes = Classnames({
      "hui-ToolTip--left": props.isFlipOver
    }, "hui-ToolTip");

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
