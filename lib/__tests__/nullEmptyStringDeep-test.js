'use strict'

import nullEmptyStringDeep from '../nullEmptyStringDeep'

describe('nullEmptyStringDeep', function () {
  it('should change empty string to null recursively', function () {
    var obj = {
      a: 1,
      b: {
        s1: '',
        s2: {
          x1: ''
        }
      },
      c: ''
    }
    var newObj = nullEmptyStringDeep(obj)

    expect(newObj.c).to.equal(null)
    expect(newObj.b.s1).to.equal(null)
    expect(newObj.b.s2.x1).to.equal(null)
  })
})
