"use strict";

var Dispatcher    = require('react-capacitor/lib/Dispatcher');
var AppDispatcher = new Dispatcher();

// When testing it would be nice to reset the dispatcher's state.
AppDispatcher.reset = function() {
  this._actions = {};
  this._callbacks = [];
  this._promises = [];
};

module.exports = AppDispatcher;
