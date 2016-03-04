'use strict'

let exists = scope => typeof scope !== 'undefined' ? scope : null

let bind = (e, fn, scope) => {
  scope.addEventListener && scope.addEventListener(e, fn)
  scope.attachEvent && scope.attachEvent(`on${e}`, () => fn.call(scope))
}

let unbind = (e, fn, scope) => {
  scope.removeEventListener && scope.removeEventListener(e, fn)
  scope.attachEvent && scope.detachEvent(`on${e}`, () => fn.call(scope))
}

let manageBinding = (e, fn, binding, scope) => {
  e instanceof Array && e.forEach(ev => binding(ev, fn, scope))
  typeof e === 'string' && binding(e, fn, scope)
}

let addListeners = (e, fn, scope: window) => exists(scope) && manageBinding(e, fn, bind, scope)
let removeListeners = (e, fn, scope: window) => exists(scope) && manageBinding(e, fn, unbind, scope)

export default { addListeners, removeListeners }
