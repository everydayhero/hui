/** @jsx React.DOM */
"use strict";

var React    = require('react');
var TopBar   = require('../layout/TopBar');
var Masthead = require('../layout/Masthead');

module.exports = React.createClass({
  displayName: 'DemoPage',

  render: function() {
    return (
      <div className="DemoPage">
        <TopBar>
          <Masthead applicationName={ "UI Library" } />
        </TopBar>
      </div>
    );
  }
});
