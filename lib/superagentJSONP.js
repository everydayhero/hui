'use strict'

import uuid from 'uuid'
import superagent from 'superagent'

function noop () {}

function callbackWrapper (data) {
  this._jspCleanup()
  this._jspCallback.call(this, null, {
    body: data
  })
}

function end (callback) {
  this._jspCallback = callback

  let query = superagent.serializeObject(this._query.join('&'))
  this.url += this.url.indexOf('?') !== -1 ? '&' + query : '?' + query

  let target = document.getElementsByTagName('script')[0] || document.head

  let script = document.createElement('script')
  script.src = this.url
  target.parentNode.insertBefore(script, target)

  this._jspCleanup = () => {
    if (script.parentNode) script.parentNode.removeChild(script)
    window[this._jspCallbackId] = noop
    if (this._timer) clearTimeout(this._timer)
  }

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(() => {
      this._jspCleanup()
      this.timedout = true
      this.abort()
    }, this._timeout)
  }
}

export default function superagentJSONP (request) {
  request._jspCallbackId = '__jsp' + uuid.v4().replace(/-/g, '')
  window[request._jspCallbackId] = callbackWrapper.bind(request)
  request.end = end.bind(request)
  request.query({ callback: request._jspCallbackId })
  return request
}
