"use strict";

var pkg = require('../package');

module.exports = {
  assestPath: function(assestName) {
    var sever =  process.env.BUILD_ENV === 'package' ? '/' : pkg.assets_cdn;

    return [sever, 'images-', pkg.version, '/', assestName].join('');
  },
};
