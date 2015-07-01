"use strict";

var React      = require('react');
var Footer     = require('../../../layout/Footer');
var Highlight  = require('react-highlight');

module.exports = React.createClass({
  displayName: 'FooterExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3">Footer</h3>
      <div className="DemoPage__example">
        <Footer/>
      </div>
    </div>
    );
  }
});
