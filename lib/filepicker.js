'use strict';

var filepicker = global.filepicker;

if (filepicker) {
  filepicker.setKey(global.ENV.FILEPICKER_KEY);
} else {
  console.error('Filepicker library is not loaded.');
}

module.exports = filepicker;
