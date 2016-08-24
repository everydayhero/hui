'use strict'

// Requires I18n mixin

import merge from 'lodash/object/merge'
import isEmpty from 'lodash/lang/isEmpty'
import cloneDeep from 'lodash/lang/cloneDeep'
import React from 'react'
import validation from '../lib/validation'

export default {
  propTypes: {
    duplicate: React.PropTypes.object
  },

  getDefaultProps() {
    return { duplicate: {}}
  },

  duplicating: {},

  fieldMethods(name) {
    return {
      onChange: this.onFieldChange(name),
      onUnmount: this.onFieldUnmount(name),
      onError: this.onFieldError(name)
    }
  },

  renderField(Component, name, method, props) {
    let state = this.state
    let methods = this.fieldMethods(name)
    props = merge(methods, props)
    return (
      <Component { ...props }
        key={ name }
        name={ name }
        controlled={ true }
        autoComplete={ false }
        label={ this.t(name) }
        hint={ this.t(name + '_hint') }
        value={ state.form[name] || state.form[this.duplicating[name]] }
        showError={ state.showErrors }
        spacing="tight"
        required={ !!method }
        validate={ typeof method === 'function' ? method : validation[method] }
        errorMessage={ typeof method === 'string' && validation[method + 'Message'] } />
    )
  },

  setErrors() {
    let errors = cloneDeep(this.errors)
    this.setState({ errors })
    if (this.props.onError) { this.props.onError(isEmpty(errors) || errors) }
  },

  onFieldError(key) {
    if (!this.errors) { this.errors = this.state.errors || {} }
    return (bool) => {
      this.errors[key] = bool
      this.setErrors()
    }
  },

  setForm() {
    let form = cloneDeep(this.form)
    this.setState({ form }, () => {
      if (this.props.onChange) { this.props.onChange(form) }
      if (this.fieldChangeHandler) { this.fieldChangeHandler() }
    })
  },

  onFieldChange(key) {
    if (!this.form) { this.form = this.state.form || {} }
    let dupe = this.props.duplicate[key]
    if (dupe && typeof this.duplicating[dupe] === 'undefined') { this.duplicating[dupe] = key }
    return value => {
      this.form[key] = value
      let source = this.duplicating[key]
      if (source) {
        this.duplicating[key] = this.form[source] === value && source
      } else if (this.duplicating[dupe]) {
        this.form[dupe] = value
      }
      this.setForm()
    }
  },

  onFieldUnmount(key) {
    return () => {
      delete this.form[key]
      delete this.errors[key]
      this.setForm()
      this.setErrors()
    }
  }
}
