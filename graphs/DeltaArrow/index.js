"use strict";

var _       = require('lodash');
var React   = require('react');
var numeral = require('numeral');

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
    var props      = this.props,
        delta      = props.delta,
        loading    = props.loading,
        emptyState = props.emptyState,
        path;

    if (delta == null || delta > 0 || loading == true || emptyState == true) {
      path = "M2.8,38c-1.1,0-1.6-0.8-1-1.7l19.6-34c0.6-1,1.5-1,2,0l19.6,34c0.5,1,0.1,1.7-1,1.7H2.8z";
    } else {
      path = "M42.1,1.3c1.1,0,1.5,0.8,1,1.7L23.5,37c-0.5,1-1.5,1-2,0L1.8,3c-0.5-1-0.1-1.7,1-1.7H42.1z";
    }

    return (
      <svg>
        <path d={ path } />
      </svg>
    );
  },

  render: function() {
    var props      = this.props,
        delta      = props.delta,
        loading    = props.loading,
        emptyState = props.emptyState,
        className,
        text;

    if (loading == true) {
      className = "hui-DeltaArrow--loading";
    } else if (emptyState == true) {
      className = "hui-DeltaArrow--emptyState";
    } else if (delta == 0) {
      return null;
    } else if (delta == null ) {
      className = "hui-DeltaArrow--unknown";
    } else if (delta > 0 ) {
      className = "hui-DeltaArrow--up";
    } else if (delta < 0 ) {
      className = "hui-DeltaArrow--down";
    }

    if (loading == true || emptyState == true) {
      text = '';
    } else if (delta == null ) {
      text = '--%';
    } else {
      text = numeral(delta).format('0a%')
                           .toString()
                           .replace(/^-/, "");
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
