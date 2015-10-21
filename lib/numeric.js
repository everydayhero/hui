'use strict';

import numeral from 'numeral'

let numeric = {
  money: function(symbol, cents) {
    cents = cents || 0
    return symbol + numeral(cents / 100).format('0.00')
  },

  distance: function(symbol, distance) {
    return  numeral(distance).format('0') + symbol
  }
}

module.exports = numeric
