'use strict';
// Based on https://github.com/Khan/react-components/blob/master/test/compiler.js
var transform = require('./stub-transform');

// Install the compiler.
require.extensions['.js'] = function(module, filename) {
  return module._compile(transform(filename), filename);
};
