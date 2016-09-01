export const scrollTo = (element, to, duration) => {
  if (duration <= 0) return
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 16

  window.requestAnimationFrame(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 16)
  })
}

const queryPad = (p) => p.length < 2 ? [p[0], ''] : p
const queryReducer = (prev, curr) => {
  const p = queryPad(curr.split('=', 2))
  prev[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
  return prev
}
const queryMap = (q) => !q[0] ? {} : q.reduce(queryReducer, {})

export const urlQuery = queryMap(window.location.search.substr(1).split('&'))
