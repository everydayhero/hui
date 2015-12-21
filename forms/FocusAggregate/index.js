'use strict'

import React from 'react'

var blurringTimer

export default React.createClass({
  displayName: 'FocusAggregate',
  getDefaultProps () {
    return {
      onFocus: () => {},
      onBlur: () => {},
    }
  },
  handleFocus (e) {
    clearTimeout(blurringTimer)
    this.props.onFocus(e)
  },
  handleBlur (e) {
    clearTimeout(blurringTimer)
    blurringTimer = setTimeout(() => {
      this.props.onBlur(e)
    }, 100)
  },
  render () {
    const { children, className } = this.props
    return (
      <div
        className={ className }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }>
        { children }
      </div>
    )
  }
})
