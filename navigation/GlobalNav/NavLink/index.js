'use strict';

import React from 'react'

import Icon from '../../../atoms/Icon'

import cx from 'classnames'

export default React.createClass({
  displayName: 'NavLink',

  propTypes: {
    transparent: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['mobile', 'desktop', 'cta', 'account']).isRequired,
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    onBlur: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      transparent: false,
      icon: null
    }
  },

  render() {
    let props = this.props
    let showIcon = props.icon && ['desktop', 'account'].indexOf(props.kind) !== -1
    let classes = cx({
      'hui-NavLink--transparent': props.transparent,
      'hui-NavLink--active': (typeof window !== 'undefined') && window.location.href.indexOf(this.props.href) !== -1
    }, 'hui-NavLink', 'hui-NavLink--' + props.kind)

    return (
      <a className={ classes } href={ props.href } onBlur={ props.onBlur }>
        { showIcon && <Icon className="hui-NavLink__icon" icon={ props.icon } /> }
        <span className="hui-NavLink__label">{ props.label }</span>
      </a>
    )
  }
})
