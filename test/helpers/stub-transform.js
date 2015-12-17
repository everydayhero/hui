'use strict';
// Based on https://github.com/Khan/react-components/blob/master/test/compiler.js
var transform = require('babel').transformFileSync;
var babelOptions = { ignore: 'node_modules/' };

var reactStub = 'module.exports = require("react").createClass({render:function(){return null;}});';

module.exports = function(filename) {
  if (global.reactModulesToStub) {
    var stubs = global.reactModulesToStub;
    var i = stubs.length;
    while (i--) {
      if (filename.indexOf(stubs[i]) !== -1) {
        return reactStub;
      }
    }
  }
  return transform(filename, babelOptions).code;
};
