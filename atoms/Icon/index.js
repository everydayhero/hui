'use strict'

import React from 'react'
import cx from 'classnames'

export default React.createClass({
  displayName: 'Icon',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    fixedWidth: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    spin: React.PropTypes.bool,
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      disabled: false,
      fixedWidth: false,
      spin: false,
      type: '',
      onClick: () => {}
    }
  },

  onClick(e) {
    !this.props.disabled && this.props.onClick(e)
  },

  render: function() {
    let { icon, type, fixedWidth, spin, className} = this.props
    spin = icon === 'circle-o-notch' || icon === 'spinner' || icon === 'refresh' || spin
    let classes = cx([
      'hui-Icon',
      type && ('hui-Icon--' + type),
      'fa',
      fixedWidth && 'fa-fw',
      spin && 'fa-spin',
      'fa-' + (icon || '')
    ])
    let wrapperClasses = cx(['hui-IconWrapper', className])

    return (
      <span className={ wrapperClasses } onTouchStart={ this.onClick } onMouseDown={ this.onClick }><i className={ classes } /></span>
    )
  }
})
