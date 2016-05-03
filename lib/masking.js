/*jshint -W100 */

'use strict'

function mask(pattern, exp, val, fn) {
  var trim = pattern.replace(exp, '')
  var i = -1
  var masked = pattern.replace(exp, () => val[i++] || '')
  if (masked && trim.indexOf(masked[masked.length - 1]) !== -1) {
    masked = masked.slice(0, -1)
  }
  if (fn) { fn(masked) }
  return masked
}

const numbersOnly = (num) => num.replace(/[^0-9]+/g, '')
const rex = (c) => new RegExp(c, 'g')

export default {
  mmyy(val, fn) {
    return mask('xx/xx', rex('x'), numbersOnly(val), fn)
  },
  numbersOnly
}
