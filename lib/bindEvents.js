'use strict'

let el = typeof window !== 'undefined' ? window : null

let addListeners = (events, handler) => {
  if (el && events instanceof Array) {
    events.forEach(e => {
      el.addEventListener
        ? el.addEventListener(e, handler)
        : el.attachEvent(`on${e}`, () => handler.call(el))
    })
  }
}

let removeListeners = (events, handler) => {
  if (el && events instanceof Array) {
    events.forEach(e => {
      el.removeEventListener
        ? el.removeEventListener(e, handler)
        : el.detachEvent(`on${e}`, () => handler.call(el))
    })
  }
}

export default { addListeners, removeListeners }
