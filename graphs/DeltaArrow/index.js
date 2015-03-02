/** @jsx React.DOM */
"use strict";

var _       = require('lodash');
var React   = require('react');
var numeral = require('numeral');

module.exports = React.createClass({
  displayName: 'DeltaArrow',

  propTypes: {
    delta: React.PropTypes.number.isRequired,
  },

  renderTriangle: function() {
    if (this.props.delta > 0 ) {
      return (
        <svg>
          <path d="M2.8,38c-1.1,0-1.6-0.8-1-1.7l19.6-34c0.6-1,1.5-1,2,0l19.6,34c0.5,1,0.1,1.7-1,1.7H2.8z"/>
        </svg>
      );
    } else {
      return (
        <svg>
          <path d="M42.1,1.3c1.1,0,1.5,0.8,1,1.7L23.5,37c-0.5,1-1.5,1-2,0L1.8,3c-0.5-1-0.1-1.7,1-1.7H42.1z"/>
        </svg>
      );
    }
  },

  render: function() {
    var className, x;

    if (this.props.delta == 0) {
      return null;
    }

    if (this.props.delta > 0 ) {
      className = "hui-DeltaArrow--up";
    } else {
      className = "hui-DeltaArrow--down";
    }

    x = numeral(this.props.delta).format('0%');
    x = x.toString().replace(/^-/, "");

    return (
      <div className={ className }>
        { this.renderTriangle() }
        <div className="hui-DeltaArrow__value">
          { x }
        </div>
      </div>
    );
  }
});
