"use strict";

var React      = require('react');
var Classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'TopBar',

  propTypes: {
    children: React.PropTypes.node
  },

  render: function() {
    var className = Classnames({
      "hui-TopBar--fixed": this.props.fixed
    }, "hui-TopBar");

    return (
      <div className={ className }>
        { this.props.children }
      </div>);
  }
});
