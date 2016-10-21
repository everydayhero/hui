'use strict'

import 'console-polyfill'

import _ from 'lodash'

function toString (obj) {
  return _.map(obj, function (value, key) {
    return key + '=' + value
  }).join(',')
}

function openPopup (url, config, onClose) {
  config = _.defaults(config || {}, { width: 640, height: 320 })

  var windowTop = window.screenTop ? window.screenTop : window.screenY
  var windowLeft = window.screenLeft ? window.screenLeft : window.screenX

  config.top = windowTop + (window.innerHeight / 2) - (config.height / 2)
  config.left = windowLeft + (window.innerWidth / 2) - (config.width / 2)
  config = toString(config)

  var popUp = window.open(url, 'shareWindow', config)

  var pollTimer = setInterval(function () {
    if (popUp.closed !== false) {
      window.clearInterval(pollTimer)
      if (onClose) { onClose() }
    }
  }, 200)
}

export default openPopup
