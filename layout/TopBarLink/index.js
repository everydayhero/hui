/** @jsx React.DOM */
"use strict";

var React      = require('react');

module.exports = React.createClass({
  displayName: 'TopBarLink',

  render: function() {
    return (
      <a className="hui-TopBarLink"  {...this.props} >
        { this.props.children }
      </a>);
  }
});
