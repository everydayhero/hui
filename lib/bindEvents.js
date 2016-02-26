'use strict'

let el = typeof window !== 'undefined' ? window : null

export const addListeners = (events, handler) => {
  if (el && events instanceof Array) {
    events.forEach(e => {
      el.addEventListener
        ? el.addEventListener(e, handler)
        : el.attachEvent(`on${e}`, () => handler.call(el))
    })
  }
}

export const removeListeners = (events, handler) => {
  if (el && events instanceof Array) {
    events.forEach(e => {
      el.removeEventListener
        ? el.removeEventListener(e, handler)
        : el.detachEvent(`on${e}`, () => handler.call(el))
    })
  }
}
