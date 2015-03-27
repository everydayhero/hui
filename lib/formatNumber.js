"use strict";

var React = require('react');
var numeral = require('numeral');

function formatNumber(amount, format) {
  var format = format || null;

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

module.exports = formatNumber;
