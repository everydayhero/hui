/** @jsx React.DOM */
"use strict";

var React      = require('react');

module.exports = React.createClass({
  displayName: 'AuthStatus',

  propTypes: {
    routes: React.PropTypes.object,
  },

  render: function() {
    var routes = this.props.routes;

    return (
      <div className="AuthStatus">
        auth status
      </div>
    );
  }
});
