'use strict'

import numeral from 'numeral'

export default (template, data, strip) => {
  if (!data && !strip) { return template }

  data = data || {}

  return template.replace(/{([^{}]+)}/g, (a, b) => {
    let parts = b.split(':')
    let format = parts[1] ? parts[1].trim() : ''
    let key = parts[0].trim()
    let value = data[key]
    if (value === null) { return strip ? '' : a }
    if (typeof value === 'string') { value = value.trim() }
    return format ? numeral(value).format(format) : value
  })
}
