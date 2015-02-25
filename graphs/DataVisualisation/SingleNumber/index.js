"use strict";

var React   = require('react');
var numeral = require('numeral');

module.exports = React.createClass({
  displayName: 'SingleNumber',

  propTypes: {
    type: React.PropTypes.oneOf(['donations', 'supporters'])
  },

  getDefaultProps: function() {
    return {
      format: '0.0a',
    };
  },

  metricFormatted: function() {
    var props = this.props;

    return numeral(props.value).format(props.format);
  },

  render: function() {
    return (
      <div className="hui-SingleNumber">
        <div className="hui-SingleNumber__metric">
          { this.metricFormatted() }
        </div>
      </div>
    );
  }
});
