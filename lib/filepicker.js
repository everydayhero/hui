'use strict'

import 'console-polyfill'

var filepicker = global.filepicker;

const notLoadedError = () => {
  throw new Error('The filepicker library is not loaded. ' +
    'See https://www.filestack.com/')
}

if (filepicker) {
  filepicker.setKey(global.ENV.FILEPICKER_KEY);
} else {
  
  // Only log the error if you're trying to actually use Filepicker library,
  // since it's possible to load HUI but never use the Filepicker-driven
  // components.
  filepicker = {
    setKey: notLoadedError,
    pick: notLoadedError
  }
}

export default filepicker
