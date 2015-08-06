'use strict'

import isObject from 'lodash/lang/isObject'
import format from './format'

let separator = '.'

function lookup(value, key, region) {
  let keys = key.split(separator)

  for (let i = 0; value && i < keys.length; ++i) {
    value = value[region] && value[region][keys[i]] || value.en && value.en[keys[i]] || value[keys[i]]
  }
  return value
}

function t(i18n, key, params, region) {
  let scope = params && params.scope
  let value = scope && lookup(i18n, scope + separator + key, region) || lookup(i18n, key, region)

  if (params && params.count !== undefined && isObject(value)) {
    let pluralisation = params.count === 1 ? 'one' : 'other'
    value = value[pluralisation]
  }

  return value && format(value, params)
}

export default { t }
