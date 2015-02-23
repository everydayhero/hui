/** @jsx React.DOM */
"use strict";

require('./env');
var React    = require('react');
var DemoPage = require('./DemoPage');
var content  = document.getElementById("content");

global.React = React;

React.render(<DemoPage/>, content);


