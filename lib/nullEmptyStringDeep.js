'use strict'

import _ from 'lodash'

function nullEmptyStringDeep (obj) {
  _.forEach(obj, function (n, key) {
    if (n === '') {
      obj[key] = null
    } else if (typeof n === 'object') {
      nullEmptyStringDeep(n)
    }
  })
  return obj
}

export default nullEmptyStringDeep
