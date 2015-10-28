'use strict';

import './xhrShim'
import 'console-polyfill'
import { canUseDOM } from 'exenv'
import Promise from 'bluebird'
import request from 'superagent'
import jsonp from './superagentJSONP'

Promise.onPossiblyUnhandledRejection((error) => {
  console.log(error);
  throw error;
});

function getFormat (url) {
  return url.split('.').pop().split(/\#|\?/)[0]
}

function isJSONP (url, params) {
  return (params && params.__jsonp) || (getFormat(url) === 'jsonp')
}

function getJSON (url, params, credentials) {
  let req

  return new Promise((resolve, reject) => {
    req = request.get(url)
    if (isJSONP(url, params)) { req = req.use(jsonp) }
    if (params) { req = req.query(params) }
    if (credentials && !req.withCredentials) {
      return reject(`Cannot authenticate this request: ${url}`)
    }
    if (credentials && req.withCredentials) {
      req = req.withCredentials()
    }

    return req.end((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.body)
      }
    })
  }).cancellable().catch(Promise.CancellationError, err => req.abort(err))
}

let cache = {}
function cachedGetJSON(url, params, credentials, deserializedData) {
  let key = url + JSON.stringify(params || '')
  if (deserializedData && !cache[key]) {
    cache[key] = deserializedData
  }
  if (cache[key]) {
    return Promise.resolve(cache[key])
  }

  return getJSON(url, params, credentials).then((data) => {
    cache[key] = data
    return data
  })
}

export default (u, p, c, d) => canUseDOM ? cachedGetJSON(u, p, c, d) : getJSON(u, p, c)
