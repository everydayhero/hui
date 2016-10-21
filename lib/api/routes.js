'use strict'

import 'console-polyfill'

import _ from 'lodash'
import format from '../format'
import parseUrl from '../parseUrl'

var defaultBaseUrl = 'https://everydayhero.com'
var baseRoutes = {
  address: '{baseUrl}/api/v2/addresses/{country}/{id}.jsonp',
  searchAddresses: '{baseUrl}/api/v2/addresses.jsonp?country_code={country}&q={searchTerm}'
}
var routes = {}

function removeEmptyQueryParams (url) {
  return url.replace(/\w+(?:\W+|)=(&|$)/g, '').replace(/(\?|&)$/, '')
}

function getRoute (name, params) {
  var route = routes[name]
  if (!route) { return false }

  params = _.mapValues(params, function (value) {
    if (_.isArray(value)) {
      return value.join(',')
    }
    return value == null ? '' : value
  })

  route = format(route, params, true)
  route = removeEmptyQueryParams(route)

  return route
}

function setBaseUrl (baseUrl) {
  var splitUrl = parseUrl(baseUrl)
  if (!splitUrl) {
    console.error('Invalid base URL "' + baseUrl + '", expected URL such as "http://server.com" or "http://localhost:3000".')
    return false
  }

  var params = {
    protocol: splitUrl.protocol,
    hostname: splitUrl.hostname,
    baseUrl
  }

  routes = _.mapValues(baseRoutes, function (url) {
    return format(url, params)
  })
}

setBaseUrl(defaultBaseUrl)

export default {
  get: getRoute,
  setBaseUrl
}
