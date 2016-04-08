'use strict';

import numeral from 'numeral'

let numeric = {
  money: function(symbol, cents, format) {
    cents = cents || 0
    format = format || '0.00'
    return symbol + numeral(cents / 100).format(format)
  },

  distance: function(symbol, distance, format) {
    format = format || '0.00'
    distance = distance || 0

    return  numeral(distance).format(format) + symbol
  }
}

export default numeric
