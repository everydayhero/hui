'use strict'

import React from 'react'
import InputErrors from '../forms/InputErrors'

export default {
  onTab(e) {
    let props = this.props
    if(e.key === 'Tab' && props.onTab) {
      props.onTab(props.value)
    }
  },

  shouldShowError() {
    let errors = collectErrors(this.props, this.state) || []

    return this.state.hasError || errors.length
  },

  shouldRenderMessage () {
    const {
      hint,
      errorMessage
    } = this.props

    const errors = collectErrors(this.props, this.state) || []

    const { focused } = this.state

    return (!!errorMessage && this.shouldShowError()) ||
           (!!errors.length && this.shouldShowError()) ||
           (!!hint && focused)
  },

  renderMessage() {
    let props = this.props
    let message

    const displayErrors = collectErrors(this.props, this.state)

    let errors = this.state.hasError
      ? displayErrors || [props.errorMessage]
      : props.errors || []

    if (errors.length > 0) {
      message = (<InputErrors errors={ errors } />)
    } else {
      message = this.props.hint
    }

    return this.shouldRenderMessage() && (
      <div className="hui-TextInput__message">
        { message }
      </div>
    )
  }
}

function collectErrors(props, state) {
  if (props.errors && props.errors.length) {
    return props.errors
  }
  if (state.errors && state.errors.length) {
    return state.errors
  }
}