'use strict'

import React from 'react'
import Icon from '../../atoms/Icon'
import cx from 'classnames'
import dataAttributesFromProps from '../../lib/dataAttributesFromProps'

export default React.createClass({
  displayName: 'Button',

  propTypes: {
    className: React.PropTypes.string,
    data: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    iconLeft: React.PropTypes.bool,
    iconSpin: React.PropTypes.bool,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    borderless: React.PropTypes.bool,
    kind: React.PropTypes.oneOf([
      'cta', 'cta-borderless',
      'primary', 'primary-borderless',
      'secondary', 'secondary-borderless',
      'tertiary', 'tertiary-borderless',
      'facebook', 'facebook-borderless',
      'twitter', 'twitter-borderless',
      'googleplus', 'googleplus-borderless',
      'pinterest', 'pinterest-borderless'
    ]).isRequired,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    target: React.PropTypes.string,
    thin: React.PropTypes.bool,
    slim: React.PropTypes.bool,
    type: React.PropTypes.oneOf(
      ['submit', 'reset', 'button']
    ),
    uppercase: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      data: null,
      disabled: false,
      href: null,
      icon: '',
      iconLeft: false,
      iconSpin: false,
      borderless: false,
      inverse: false,
      label: '',
      target: null,
      thin: false,
      slim: false,
      type: 'button'
    }
  },

  getInitialState() {
    return { state: null }
  },

  ignoreClick(e) {
    e.preventDefault()
  },

  propogateClick(e) {
    let { onClick } = this.props
    !!onClick && onClick(e)
  },

  icon() {
    let { icon, iconSpin } = this.props
    return !!icon && <Icon className="hui-Button__icon" icon={ icon } spin={ iconSpin } />
  },

  render() {
    let props = this.props
    let href = props.href
    let clickHandler = props.disabled ? this.ignoreClick : this.propogateClick
    let kind = props.borderless ? props.kind + '-borderless' : props.kind
    let El = !!href ? 'a' : 'button'

    let classes = cx([
      props.className,
      'hui-Button',
      'hui-Button--' + kind,
      props.disabled && 'hui-Button--disabled',
      props.inverse && 'hui-Button--inverse',
      !props.slim && props.thin && 'hui-Button--thin',
      props.slim && 'hui-Button--slim',
      props.icon && 'hui-Button--hasIcon',
      props.iconLeft && 'hui-Button--iconLeft',
      props.uppercase && 'hui-Button--uppercase'
    ])

    return (
      <El { ...dataAttributesFromProps(props) } target={ props.target } className={ classes }
        id={ props.id }
        name={ props.name }
        value={ props.value }
        tabIndex={ 1 }
        type={ props.type }
        to={ href }
        href={ href }
        disabled={ props.disabled && 'disabled' }
        onClick={ clickHandler }>
        { this.icon() }
        <span className="hui-Button__label">{ props.label || props.children }</span>
      </El>
    )
  }
})
