'use strict'

import React from 'react'
import InputErrors from '../forms/InputErrors'
import array from 'lodash/array'
const { compact } = array

export default {
  onTab (e) {
    let props = this.props
    if (e.key === 'Tab' && props.onTab) {
      props.onTab(props.value)
    }
  },

  shouldShowError () {
    const { errors, showError } = this.props
    const propErrors = errors || []

    return (showError && this.state.hasError) || (showError && !!propErrors.length)
  },

  shouldRenderMessage () {
    const {
      hint
    } = this.props

    const { focused } = this.state

    return this.shouldShowError() || (!!hint && focused)
  },

  renderMessage () {
    const props = this.props
    const state = this.state || {}
    let message

    const displayErrors = collectErrors(props) || collectErrors(state)

    let errors = this.state.hasError
      ? displayErrors || compact([props.errorMessage])
      : props.errors || []

    if (this.shouldShowError()) {
      message = (<InputErrors errors={errors} />)
    } else {
      message = this.props.hint
    }

    return this.shouldRenderMessage() && (
      <div className='hui-TextInput__message'>
        {message}
      </div>
    )
  }
}

function collectErrors (props) {
  if (props.errors && props.errors.length) {
    return props.errors
  }
}
