'use strict'

import React from 'react'
import i18n from '../lib/i18n'
import Remarkable from 'remarkable'
let md = new Remarkable({ xhtmlOut: true, breaks: true })

export default {
  t(key, params) {
    return i18n.t(this.constructor.i18n, key, params, this.props.region)
  },

  tm(key, params) {
    return (
      <span dangerouslySetInnerHTML={{
        __html: md.render(this.t(key, params))
      }} />
    )
  }
}
