"use strict";

jest.autoMockOff();

var formatNumber = require('../formatNumber');
var numeral      = require('numeral');


describe('#formatNumber', function() {
  it('should format number when ', function() {
    var number   = 99 * 100;
    var expected = numeral(number/100).format('0.00');

    expect(formatNumber(number)).toEqual(expected);
  });
});
