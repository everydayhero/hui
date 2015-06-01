"use strict";
var classNamesArray = require('../classNamesArray');

describe('classNamesArray', function() {
  it('should return a string of classnames', function() {
    var classes = classNamesArray([false, true && 'foo', 'no' && false, 'bar'])

    expect(classes).to.equal('foo bar');
  });
});
