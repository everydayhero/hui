"use strict";

var React   = require('react');
var numeral = require('numeral');

module.exports = React.createClass({
  displayName: 'SingleNumber',

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
      <div className="SingleNumber">
        <h2 className="SingleNumber__title">{ this.props.title }</h2>
        <div className="SingleNumber__metric">
          { this.metricFormatted() }
        </div>
      </div>
    );
  }
});
