'use strict'

import './xhrShim'
import 'console-polyfill'
import Promise from 'bluebird'
import request from 'superagent'

export default (url, method) => {
  return new Promise((resolve, reject) => {
    return request[method](url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        (err || !res.body) ? reject(err) : resolve(res.body)
      })
  })
}
