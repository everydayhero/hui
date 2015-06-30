'use strict';

var _ = require('lodash');
var browser = typeof window !== 'undefined';
var root = browser ? window : global;
if (!root.App) { root.App = {}; }
var locals = root.App;

locals.IS_CLIENT = browser;
locals.SAME_DOMAIN = browser && window.location.host.indexOf(locals.supporter_domain) !== -1;

locals.expose = function(data, key) {
  locals[key] = data;
};

locals.apply = function(res) {
  _.forEach(locals, function(d, k) {
    if (!_.isFunction(d)) { res.expose(d, k); }
  });
};

locals.cleanUp = function(keys) {
  keys.forEach(function(key) {
    delete locals[key];
  });
};

module.exports = locals;
