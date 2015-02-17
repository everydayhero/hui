/** @jsx React.DOM */
"use strict";

var React      = require('react');

module.exports = React.createClass({
  displayName: 'TopBar',

  propTypes: {
    children: React.PropTypes.node
  },

  render: function() {
    return (
      <div className="hui-TopBar">
        { this.props.children }
      </div>);
  }
});