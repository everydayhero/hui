/** @jsx React.DOM */
"use strict";

var React      = require('react');

module.exports = React.createClass({
  displayName: 'TopBar',

  render: function() {
    return (
      <div className="hui-TopBar">
        { this.props.children }
      </div>);
  }
});
