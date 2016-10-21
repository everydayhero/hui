'use strict'

import React from 'react'
import cx from 'classnames'

export default React.createClass({
  displayName: 'LeadCopy',

  propTypes: {
    text: React.PropTypes.string,
    className: React.PropTypes.string
  },

  render () {
    let { text, className, children } = this.props
    let classes = cx(['LeadCopy', className])

    return <span className={classes}>{ text || children }</span>
  }
})
