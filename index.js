/** @jsx React.DOM */
"use strict";

var React    = require('react');
var DemoPage = require('./DemoPage');
var content  = document.getElementById("content");

global.React = React;

React.render(<DemoPage/>, content);


