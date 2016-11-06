'use strict'
// Via http://www.asbjornenge.com/wwc/testing_react_components.html
module.exports = function (markup, options) {
  if (typeof document !== 'undefined') return
  var jsdom = require('jsdom').jsdom
  global.document = jsdom(markup || '', options)
  global.window = document.defaultView
  global.document.execCommand = function () {}
  global.navigator = {
    userAgent: 'node.js'
  }
  // ... add whatever browser globals your tests might need ...
  propagateToGlobal(global.window)
}

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) { continue }
    if (key in global) { continue }

    global[key] = window[key]
  }
}
