'use strict';

var React      = require('react');
var numeral    = require('numeral');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'DeltaArrow',

  propTypes: {
    delta: React.PropTypes.number,
    loading: React.PropTypes.bool,
    emptyState: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      loading: false,
      emptyState: false
    };
  },

  renderTriangle: function() {
    var props      = this.props;
    var delta      = props.delta;
    var loading    = props.loading;
    var emptyState = props.emptyState;
    var showBlankState = (delta === null || delta > 0 || loading === true || emptyState === true);
    var path;

    if (showBlankState) {
      path = 'M2.8,38c-1.1,0-1.6-0.8-1-1.7l19.6-34c0.6-1,1.5-1,2,0l19.6,34c0.5,1,0.1,1.7-1,1.7H2.8z';
    } else {
      path = 'M42.1,1.3c1.1,0,1.5,0.8,1,1.7L23.5,37c-0.5,1-1.5,1-2,0L1.8,3c-0.5-1-0.1-1.7,1-1.7H42.1z';
    }

    return (
      <svg>
        <path d={ path } />
      </svg>
    );
  },

  render: function() {
    var props      = this.props;
    var delta      = props.delta;
    var loading    = props.loading;
    var emptyState = props.emptyState;
    var text;
    var className = classnames({
      'hui-DeltaArrow--emptyState': emptyState,
      'hui-DeltaArrow--loading': loading,
      'hui-DeltaArrow--unknown': delta === null && !loading && !emptyState,
      'hui-DeltaArrow--up': delta > 0 && !loading && !emptyState,
      'hui-DeltaArrow--down': delta < 0 && !loading && !emptyState
    });

    if (delta === 0) {
      return null;
    }

    if (loading === true || emptyState === true) {
      text = '';
    } else if (delta === null ) {
      text = '--%';
    } else {
      text = numeral(delta).format('0a%')
                           .toString()
                           .replace(/^-/, '');
    }

    return (
      <div className={ className }>
        { this.renderTriangle() }
        <div className="hui-DeltaArrow__value">
          { text }
        </div>
      </div>
    );
  }
});
