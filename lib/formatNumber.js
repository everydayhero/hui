'use strict'

import numeral from 'numeral'

function formatNumber(amount, format) {
  if(!format) {
    switch (true) {
    case amount < 100:
      format = '0.00';
      break;
    case amount < 1000:
      format = '00';
      break;
    case amount >= 1000:
      format = '0.00 a';
      break;
    default:
      format = '0.00 a';
    }
  }

  return numeral(amount).format(format);
}

export default formatNumber
