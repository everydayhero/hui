'use strict';

var _            = require('lodash');
var React        = require('react');
var classnames   = require('classnames');
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
    totalFormat: React.PropTypes.string,
    showDate: React.PropTypes.bool,
    showTotal: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      show: false,
      data: {},
      label: null,
      isFlipOver: false,
      showDate: true,
      showTotal: true,
      position: {
        x: 0,
        y: 0
      }
    };
  },

  renderDotLine: function() {
    var pathData;

    if (this.props.isFlipOver) {
      pathData = 'M190 100 L190 0';
    } else {
      pathData = 'M10 100 L10 0';
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
    var classes = classnames({
      'hui-ToolTip__text--left': !props.isFlipOver,
      'hui-ToolTip__text--right': props.isFlipOver
    }, 'hui-ToolTip__text');

    if (_.isEmpty(props.data)) {
      return false;
    } else {
      return (
        <div className={ classes } >
          { this.renderDate() }
          { this.renderTip() }
        </div>
      );
    }
  },

  renderDate: function() {
    var props = this.props;

    if(props.showDate) {
      var date = moment(props.data.date).format('ddd MMM DD, YYYY');
      return (<p className="hui-ToolTip__date" >{ date }</p>);
    } else {
      return false;
    }
  },

  renderTip: function() {
    var props = this.props;

    return (
      <p>
        { this.renderLabel() }
        <span className="hui-ToolTip__value">{ formatNumber(props.data.value, props.totalFormat) }</span>
        { this.renderTotal() }
      </p>
    );
  },

  renderLabel: function() {
    var props = this.props;

    if(props.label) {
      return props.label + ': '
    } else {
      return false;
    }
  },

  renderTotal: function() {
    var props = this.props;

    if(props.showTotal) {
      return (
        <span className="hui-ToolTip__total">/ { formatNumber(props.data.total, props.totalFormat) }</span>
      );
    } else {
      return false;
    }
  },

  render: function() {
    var props    = this.props;
    var position = props.position;
    var x        = position.x;
    var y        = position.y;
    var style    = { left: x, top: y - 3 };

    var classes = classnames({
      'hui-ToolTip--left': props.isFlipOver
    }, 'hui-ToolTip');

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
