/** @jsx React.DOM */
"use strict";

var React    = require('react');
var DemoPage = require('./components/DemoPage');

global.React = React;

React.render(<DemoPage/>, document.body);


