"use strict";

jest.autoMockOff();

var formatNumber = require('../formatNumber');
var numeral      = require('numeral');


describe('#formatNumber', function() {
  it('should format number when less than 100', function() {
    var number   = 99;
    var expected = numeral(number).format('0.00');

    expect(formatNumber(number)).toEqual(expected);
  });

  it('should format number when between 100 and 1000', function() {
    var number   = 999;
    var expected = numeral(number).format('00');

    expect(formatNumber(number)).toEqual(expected);
  });

  it('should format number when larger and equal 1000', function() {
    var number   = 1000;
    var expected = numeral(number).format('0.00 a');

    expect(formatNumber(number)).toEqual(expected);
  });

  it('should use a passed in format', function() {
    var number   = 1000;
    var format   = '0a';
    var expected = numeral(number).format('0a');

    expect(formatNumber(number, format)).toEqual(expected);
  });
});
