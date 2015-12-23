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
    let props = this.props
    let errors = props.errors || []

    return this.state.hasError || errors.length
  },

  shouldRenderMessage () {
    const {
      hint,
      errorMessage,
      errors
    } = this.props

    const { focused } = this.state

    return (!!errorMessage && this.shouldShowError()) ||
           (!!(errors || []).length && this.shouldShowError()) ||
           (!!hint && focused)
  },

  renderMessage() {
    let props = this.props
    let message

    let errors = this.state.hasError
      ? [props.errorMessage]
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
