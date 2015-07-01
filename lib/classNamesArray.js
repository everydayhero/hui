'use strict';

var _ = require('lodash');

module.exports = function(array) {
  array = _.compact(array);

  return array.join(' ');
}
