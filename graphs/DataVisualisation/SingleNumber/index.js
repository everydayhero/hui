"use strict";

var React   = require('react');
var numeral = require('numeral');

module.exports = React.createClass({
  displayName: 'SingleNumber',

  propTypes: {
    loading: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      format: '0.0a',
      loading: false
    };
  },

  metricFormatted: function() {
    var props   = this.props,
        value   = props.value,
        format  = props.format,
        loading = props.loading;

    if (loading) {
      return '&nbsp;';
    } else {
      return numeral(value).format(format);
    }
  },

  render: function() {
    var loading = this.props.loading,
        className;

    if (loading) {
      className = "hui-SingleNumber--loading";
    } else {
      className = "hui-SingleNumber";
    }

    return (
      <div className={ className }>
        <div className="hui-SingleNumber__metric" dangerouslySetInnerHTML={{ __html: this.metricFormatted() }}>
        </div>
      </div>
    );
  }
});
