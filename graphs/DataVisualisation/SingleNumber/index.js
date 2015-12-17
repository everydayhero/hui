'use strict';

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
    var props = this.props;

    if (!props.loading && !props.emptyState) {
      return numeral(props.value).format(props.format);
    }
  },

  render: function() {
    var loading    = this.props.loading;
    var emptyState = this.props.emptyState;
    var className = classnames({
      'hui-SingleNumber--loading': loading,
      'hui-SingleNumber--emptyState': emptyState
    }, 'hui-SingleNumber');

    return (
      <div className={ className }>
        <div className="hui-SingleNumber__metric">
          { this.metricFormatted() }
        </div>
      </div>
    );
  }
});
