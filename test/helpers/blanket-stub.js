// Transform & instrument JS for Blanket coverage analysis.
// based on https://github.com/alex-seville/blanket/blob/master/src/node-loaders/coffee-script.js
'use strict';

var transform = require('./stub-transform'),
    glob = require('glob'),
    path = require('path');

module.exports = function(blanket) {

  var origJs = require.extensions['.js'];

  require.extensions['.js'] = function(localModule, filename) {
    if (filename.match(/node_modules/)) {
      return origJs(localModule, filename);
    }

    var content = transform(filename);

    // Don't instrument code unless it passes the filter.
    var pattern = blanket.options('filter');
    var normalizedFilename = blanket.normalizeBackslashes(filename);
    if (!blanket.matchPattern(normalizedFilename, pattern)) {
      localModule._compile(content, normalizedFilename);
      delete require.cache[normalizedFilename];
      return false;
    }

    blanket.instrument({
      inputFile: content,
      inputFileName: normalizedFilename
    }, function(instrumented){
      var baseDirPath = blanket.normalizeBackslashes(path.dirname(normalizedFilename)) + '/.';
      try {
        instrumented = instrumented.replace(/(^require| require)\s*\(\s*("|')\./g, 'require($2' + baseDirPath);
        localModule._compile(instrumented, normalizedFilename);
        delete require.cache[normalizedFilename];  // might be stubbed in the future.
      } catch(err){
        console.log('Error parsing instrumented code: ' + err);
      }
    });
  };

  var matches = function(_path, test) {
    var bool = false;
    if (test instanceof RegExp) {
      bool = test.test(_path);
    }
    if (typeof test === 'string') {
      bool = _path.indexOf(test) !== -1;
    }
    if (test instanceof Array) {
      for (var i = 0; !bool && i < test.length; i++) {
        bool = matches(_path, test[i]);
      }
    }
    return bool;
  };

  // Source all JS files so that they count towards the denominator.
  var pattern = './**/*.js';
  glob.sync(pattern).forEach(function(_path) {
    if (!matches(_path, blanket.options('filter')) || matches(_path, blanket.options('antifilter'))) {
      return;
    }
    // Find files relative to this file
    require('../../' + _path);
  });
};
