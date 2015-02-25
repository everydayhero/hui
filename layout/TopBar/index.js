/** @jsx React.DOM */
"use strict";

var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({
  displayName: 'TopBar',

  propTypes: {
    children: React.PropTypes.node
  },

  render: function() {
    var className = cx({
      "hui-TopBar": true,
      "hui-TopBar--fixed": this.props.fixed
    });

    return (
      <div className={ className }>
        { this.props.children }
      </div>);
  }
});
