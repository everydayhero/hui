"use strict";

var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  displayName: 'LoadingProgress',

  style: function() {
    var style;
    if (this.refs.bar && !this.props.inProgress) {
      style = { width: this.refs.bar.getDOMNode().offsetWidth || '100%' };
    }

    return style;
  },

  render: function() {
    var classes = _.compact([
      'hui-LoadingProgress__bar',
      this.props.inProgress && "--inProgress"
    ]).join('');

    return (
      <div className="hui-LoadingProgress">
        <div className={ classes } ref="bar" style={ this.style() }></div>
      </div>
    );
  }
});
