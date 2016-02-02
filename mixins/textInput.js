'use strict'

import React from 'react'
import Icon from '../atoms/Icon'
import classnames from 'classnames'

export default {
  componentDidMount() {
    let props = this.props
    if (props.disabled || props.readOnly) { return }
    let node = this.refs.input.getDOMNode()
    let value = node.value
    if (props.autoFocus) { node.focus() }
    if (value && props.validate) { this.validate() }
    this.setValue(value)
  },

  componentWillReceiveProps(nextProps) {
    let state = this.state
    if (nextProps.disabled || nextProps.readOnly) { return }
    if (nextProps.showError && !state.hasError && !state.valid && !state.focused) { this.validate() }
  },

  componentWillUnmount() {
    if (this.props.onUnmount) { this.props.onUnmount() }
  },

  maskValue(value) {
    if (!this.props.mask) { return value }
    return this.props.mask(value)
  },

  expose(value) {
    value = this.maskValue(value)
    let props = this.props
    let { onChange, onError, validate, required } = props

    if (onChange) { onChange(value) }
    if (onError && validate && required) { onError(!validate(value)) }
  },

  validate(val) {
    let props = this.props
    if (!props.required) { return }
    let value = val || this.props.value
    let hasValue = value && !!value.trim()
    if (hasValue && props.validate) {
      this.setState({ waiting: true })
      props.validate(value, this.setValid)
    } else {
      this.setValid(hasValue)
    }
  },

  handleChange(e) {
    let props = this.props
    let value = e.target.value
    if (props.disabled || props.readOnly || (!!props.limit && value.length > props.limit)) {
      return e.preventDefault()
    }
    this.setValue(value)
    if (!this.state.focused) { this.validate(value) }
  },

  handleFocus() {
    const { disabled, readOnly, onFocus, value } = this.props

    if (disabled) { return }

    if (!readOnly) {
      this.setState({ focused: true })
    }

    if (onFocus) {
      onFocus({
        element: this.getDOMNode(),
        value,
        inputElement: this.refs.input.getDOMNode()
      })
    }
  },

  handleBlur() {
    let props = this.props
    if (props.disabled || props.readOnly) { return }

    this.setState({ focused: false })
    this.validate()
    if (props.onBlur) {
      props.onBlur(props.value, val => {
        this.setValue(val);
        this.validate(val);
      });
    }
  },

  setValue(value) {
    if (this.props.disabled || this.props.readOnly) { return }
    this.setState({
      hasError: false,
      valid: false,
      value: this.maskValue(value)
    })
    this.expose(value)
  },

  setValid(valid) {
    let onError = this.props.onError
    if (onError) { onError(!valid); }
    this.setState({
      hasError: !valid,
      waiting: false,
      valid
    })
  },

  renderIcon() {
    let props = this.props
    let errors = props.errors || []
    let hasServerErrors = errors.length
    let className = classnames({
      'hui-TextInput__icon': true,
      'hui-TextInput__icon--left': (props.iconPosition === 'left')
    })
    let state = this.state
    let icon = !props.showIcon ? false
               : state.waiting ? 'refresh'
               : (state.valid && !hasServerErrors) ? 'check'
               : state.hasError ? 'times'
               : props.disabled ? 'minus'
               : props.icon ? props.icon
               : (props.required && !props.value) ? 'caret-left'
               : false;

    return icon && (
      <span className={ className }>
        <Icon icon={ icon } onClick={ props.onIconClick } disabled={ props.disabled } fixedWidth={ true } />
      </span>
    );
  },

  renderPlaceHolder() {
    if (!this.props.placeHolder || this.props.value) {
      return false
    }

    return (
      <span className="hui-TextInput__placeHolder">
        { this.props.placeHolder }
      </span>
    )
  },

  inputMethods(bool) {
    return bool && {
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus
    }
  }
}
