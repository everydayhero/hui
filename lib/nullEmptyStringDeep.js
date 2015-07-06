'use strict';

var _ = require('lodash');

function nullEmptyStringDeep(obj) {
  _.forEach(obj, function(n, key) {
    if (n === '') {
      obj[key] = null;
    } else if (typeof n === 'object') {
      nullEmptyStringDeep(n);
    }
  });
  return obj;
}

module.exports = nullEmptyStringDeep;
