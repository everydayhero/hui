"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
  dismissGlobalFlash: function() {
    AppDispatcher.triggerAction('dismissGlobalFlash');
  }
};
