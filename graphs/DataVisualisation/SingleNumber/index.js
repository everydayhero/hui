"use strict";

var React      = require('react');
var numeral    = require('numeral');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'SingleNumber',

  propTypes: {
    loading: React.PropTypes.bool,
    emptyState: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      format: '0.0a',
      loading: false,
      emptyState: false
    };
  },

  metricFormatted: function() {
    var props      = this.props,
        value      = props.value,
        format     = props.format,
        loading    = props.loading,
        emptyState = props.emptyState;

    if (loading === true || emptyState === true) {
      return;
    }

    return numeral(value).format(format);
  },

  render: function() {
    var loading    = this.props.loading,
        emptyState = this.props.emptyState,
        className = classnames({
          "hui-SingleNumber--loading": loading,
          "hui-SingleNumber--emptyState": emptyState
        }, "hui-SingleNumber");

    return (
      <div className={ className }>
        <div className="hui-SingleNumber__metric">
          { this.metricFormatted() }
        </div>
      </div>
    );
  }
});
