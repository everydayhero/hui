"use strict";

var React   = require('react');
var numeral = require('numeral');

module.exports = React.createClass({
  displayName: 'SingleNumberMetric',

  propTypes: {
    title: React.PropTypes.string.isRequired,
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
      <div className="Widget">
        <h2>{ this.props.title }</h2>
        <div className="Widget__metric">
          { this.metricFormatted() }
        </div>
      </div>
    );
  }
});
