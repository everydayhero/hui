const SCOPE = typeof window !== 'undefined' ? window : null
const NON_BUBBLING_EVENTS = ['focus', 'blur', 'change']

const _add = (e, handler, elem) => {
  elem = elem || SCOPE
  elem.addEventListener(e, handler, NON_BUBBLING_EVENTS.indexOf(e) !== -1)
}

const _remove = (e, handler, elem) => {
  elem = elem || SCOPE
  elem.removeEventListener(e, handler, NON_BUBBLING_EVENTS.indexOf(e) !== -1)
}

const _bindListeners = (fn, events, handler, elem) => {
  if (SCOPE && typeof events === 'string') {
    fn(events, handler, elem)
  } else if (SCOPE && events instanceof Array) {
    events.forEach((e) => fn(e, handler, elem))
  }
}

export const toggleEventBindings = (event, toggle, handler, elem) => (
  _bindListeners(toggle ? _add : _remove, event, handler, elem)
)

export const addEventBindings = _bindListeners.bind(null, _add)
export const removeEventBindings = _bindListeners.bind(null, _remove)
export const bindTouch = toggleEventBindings.bind(null, ['mousedown', 'touchstart'])
export const bindClick = toggleEventBindings.bind(null, 'click')
export const bindFocus = toggleEventBindings.bind(null, 'focus')
export const bindScroll = toggleEventBindings.bind(null, 'scroll')
