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

  renderMessage(hasMessage) {
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

    return hasMessage && (
      <div className="hui-TextInput__message">
        { message }
      </div>
    )
  }
}
