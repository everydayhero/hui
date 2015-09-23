'use strict';

var _ = require('lodash');
var format = require('../format');
var parseUrl = require('../parseUrl');

var defaultBaseUrl = 'https://everydayhero.com';
var baseRoutes = {
  address: '{baseUrl}/api/v2/addresses/{country}/{id}.jsonp',
  searchAddresses: '{baseUrl}/api/v2/addresses.jsonp?country_code={country}&q={searchTerm}'
};
var routes = {};

function removeEmptyQueryParams(url) {
  return url.replace(/\w+(?:\W+|)=(&|$)/g, '').replace(/(\?|&)$/, '');
}

function getRoute(name, params) {
  var route = baseRoutes[name];
  if (!route) { return false; }

  params = _.mapValues(params, function(value) {
    if (_.isArray(value)) {
      return value.join(',');
    }
    return value == null ? '' : value;
  });

  params.baseUrl = defaultBaseUrl

  route = format(route, params, true);
  route = removeEmptyQueryParams(route);

  return route;
}

function setBaseUrl(baseUrl) {
  var splitUrl = parseUrl(baseUrl);
  if (!splitUrl) {
    console.error('Invalid base URL "' + baseUrl + '", expected URL such as "http://server.com" or "http://localhost:3000".');
    return false;
  }

  var params = {
    protocol: splitUrl.protocol,
    hostname: splitUrl.hostname,
    baseUrl
  };

  routes = _.mapValues(baseRoutes, function(url) {
    return format(url, params);
  });
}

setBaseUrl(defaultBaseUrl);

module.exports = {
  get: getRoute,
  setBaseUrl
};
