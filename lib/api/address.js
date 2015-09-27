'use strict';

var routes = require('./routes');
var getJSONP = require('../getJSONP');

module.exports = {
  find: function(id, country, callback) {
    return getJSONP(routes.get('address', { id, country }), callback);
  },

  search: function(searchTerm, country, callback) {
    var query = { searchTerm: encodeURIComponent(searchTerm), country };
    return getJSONP(routes.get('searchAddresses', query), callback);
  }
};
