/** @jsx React.DOM */
"use strict";

var React     = require('react');
var TopBar    = require('../layout/TopBar');

module.exports = React.createClass({
  displayName: 'DemoPage',

  render: function() {
    return (
      <div className="DemoPage">
        <TopBar applicationName={ "UI Library" } />
      </div>
    );
  }
});
