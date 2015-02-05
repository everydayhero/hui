/** @jsx React.DOM */
"use strict";

var React      = require('react');

module.exports = React.createClass({
  displayName: 'TopBar',

  render: function() {
    var props = this.props;

    return (
      <div className="UIlib-TopBar">
        { this.props.children }
      </div>);
  }
});
