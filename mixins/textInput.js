'use strict'

import React from 'react'
import { findDOMNode } from 'react-dom'
import isArray from 'lodash/isArray'
import Icon from '../atoms/Icon'
import classnames from 'classnames'
import validation from '../lib/validation'

export default {
  componentDidMount () {
    let props = this.props
    if (props.disabled || props.readOnly) { return }
    let node = this.refs.input
    let value = node.value
    if (props.autoFocus) { node.focus() }
    if (value && props.validate) { this.validate() }
    this.setValue(value)
  },

  componentWillReceiveProps (nextProps) {
    let state = this.state
    if (nextProps.disabled || nextProps.readOnly) { return }
    if (nextProps.showError && !state.hasError && !state.valid && !state.focused) { this.validate() }
  },

  componentWillUnmount () {
    if (this.props.onUnmount) { this.props.onUnmount() }
  },

  maskValue (value) {
    if (!this.props.mask) { return value }
    return this.props.mask(value)
  },

  expose (value) {
    value = this.maskValue(value)
    let props = this.props
    let { onChange, onError, validate, required } = props

    if (onChange) { onChange(value) }
    if (onError && validate && required) { onError(!getValidator(validate)(value)) }
  },

  validate (val) {
    const { validate, required, value: propValue } = this.props
    if (!required && (!validate || !validate.length)) { return }
    let value = val || propValue || ''

    if (validate) {
      this.setState({ waiting: true })
      getValidator(validate)(value, this.setValid)
    } else {
      let hasValue = value && !!value.trim()
      this.setValid(hasValue)
    }
  },

  handleChange (e) {
    let props = this.props
    let value = e.target.value
    if (props.disabled || props.readOnly || (!!props.limit && value.length > props.limit)) {
      return e.preventDefault()
    }
    this.setValue(value)
    if (!this.state.focused) { this.validate(value) }
  },

  handleFocus () {
    const { disabled, readOnly, onFocus, value } = this.props

    if (disabled) { return }

    if (!readOnly) {
      this.setState({ focused: true })
    }

    if (onFocus) {
      onFocus({
        element: findDOMNode(this),
        value,
        inputElement: this.refs.input
      })
    }
  },

  handleBlur () {
    let { disabled, readOnly, onBlur, value } = this.props
    if (disabled || readOnly) { return }

    this.setState({ focused: false })
    this.validate()
    if (onBlur) {
      onBlur(value, val => {
        this.setValue(val)
        this.validate(val)
      })
    }
  },

  setValue (value) {
    if (this.props.disabled || this.props.readOnly) { return }
    this.setState({
      hasError: false,
      valid: false,
      value: this.maskValue(value)
    })
    this.expose(value)
  },

  setValid (valid, errors = []) {
    let onError = this.props.onError
    if (onError) { onError(!valid, errors) }
    this.setState({
      hasError: !valid,
      waiting: false,
      valid,
      errors
    })
  },

  iconName () {
    const props = this.props
    const state = this.state
    const hasServerErrors = (props.errors || []).length
    return !props.showIcon ? ''
     : state.waiting ? 'refresh'
     : (state.valid && !hasServerErrors) ? 'check'
     : state.hasError ? 'times'
     : props.disabled ? 'minus'
     : props.icon ? props.icon
     : (props.required && !props.value) ? 'caret-left'
     : ''
  },

  hasIcon () {
    return !!this.iconName()
  },

  renderIcon () {
    let props = this.props
    let className = classnames({
      'hui-TextInput__icon': true,
      'hui-TextInput__icon--left': (props.iconPosition === 'left')
    })
    let icon = this.iconName()

    return this.hasIcon() && (
      <span className={className}>
        <Icon icon={icon} onClick={props.onIconClick} disabled={props.disabled} fixedWidth />
      </span>
    )
  },

  renderPlaceHolder () {
    if (!this.props.placeHolder || this.props.value) {
      return false
    }

    return (
      <span className='hui-TextInput__placeHolder'>
        {this.props.placeHolder}
      </span>
    )
  },

  inputMethods (bool) {
    return bool && {
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus
    }
  }
}

function getValidator (validate) {
  if (isArray(validate)) {
    return validation.compose(...validate)
  }
  return validate
}
