'use strict';

// Modified from https://github.com/STRML/react-localstorage

var ls = global.localStorage;

module.exports = {
  componentWillUpdate: function() {
    if (!ls || !this.props.storeLocally) return;
    var key = getLocalStorageKey(this);
    ls.setItem(key, JSON.stringify(this.state));
  },

  componentWillMount: function () {
    if (!ls || !this.props.storeLocally) return;
    var self = this;
    loadStateFromLocalStorage(this, function() {
      ls.setItem(getLocalStorageKey(self), JSON.stringify(self.state));
    });
  }
};

function loadStateFromLocalStorage(component, cb) {
  var key = getLocalStorageKey(component);
  var settingState = false;
  try {
    var storedState = JSON.parse(ls.getItem(key));
    if (storedState) {
      settingState = true;
      component.setState(storedState, done);
    }
  } catch(e) {
    if (console && console.warn) console.warn("Unable to load state for", getDisplayName(component), "from localStorage.");
  }
  if (!settingState) done();

  function done() {
    cb();
  }
}

function getDisplayName(component) {
  return component.displayName || component.constructor.displayName;
}

function getLocalStorageKey(component) {
  if (component.getLocalStorageKey) {
    return component.getLocalStorageKey();
  }
  return component.props.localStorageKey || component.props.name || getDisplayName(component) || 'react-localstorage';
}
