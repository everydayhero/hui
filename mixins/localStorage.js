'use strict';

require('console-polyfill')

// Modified from https://github.com/STRML/react-localstorage

const ls = global.localStorage

function getDisplayName(component) {
  return component.displayName || component.constructor.displayName
}

function getLocalStorageKey(component) {
  if (component.getLocalStorageKey) {
    return component.getLocalStorageKey()
  }
  return component.props.localStorageKey || component.props.name || getDisplayName(component) || 'react-localstorage'
}

function loadStateFromLocalStorage(component, done) {
  let key = getLocalStorageKey(component)
  let settingState = false

  try {
    let storedState = JSON.parse(ls.getItem(key))
    if (storedState) {
      settingState = true
      component.setState(storedState, done)
    }
  } catch(e) {
    if (console && console.warn) console.warn('Unable to load state for', getDisplayName(component), 'from localStorage.')
  }
  if (!settingState) done()
}

export default {
  componentWillUpdate() {
    if (!ls || !this.props.storeLocally) return
    let key = getLocalStorageKey(this)
    ls.setItem(key, JSON.stringify(this.state))
  },

  componentWillMount () {
    if (!ls || !this.props.storeLocally) return
    loadStateFromLocalStorage(this, () => {
      ls.setItem(getLocalStorageKey(this), JSON.stringify(this.state))
    })
  }
}
