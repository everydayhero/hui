"use strict";

jest.autoMockOff();

var nullEmptyStringDeep = require('../nullEmptyStringDeep');

describe('#nullEmptyStringDeep', function() {
  it('should change empty string to null recursively', function() {
    var obj = {
      a: 1,
      b: {
        s1: '',
        s2: {
          x1: ''
        }
      },
      c: ''
    };
    var newObj = nullEmptyStringDeep(obj);

    expect(newObj.c).toEqual(null);
    expect(newObj.b.s1).toEqual(null);
    expect(newObj.b.s2.x1).toEqual(null);
  });
});
