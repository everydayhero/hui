'use strict'

import React from 'react'
import InputErrors from '../forms/InputErrors'
import array from 'lodash/array'
import get from 'lodash/get'
const { compact } = array

export default {
  onTab (e) {
    let props = this.props
    if (e.key === 'Tab' && props.onTab) {
      props.onTab(props.value)
    }
  },

  shouldShowError () {
    let propErrors = this.props.errors || []
    const stateErrors = get(this, 'state.errors') || []
    const hasErrorArray = !!(propErrors.length || stateErrors.length)

    return this.state.hasError && (hasErrorArray || this.props.errorMessage)
  },

  hasErrorMessages () {
    const {errorMessage, errors} = this.props

    return this.shouldShowError() && (errors.length > 0 || !!errorMessage)
  },

  shouldRenderMessage () {
    const {
      hint
    } = this.props

    const { focused } = this.state

    return this.hasErrorMessages() || (!!hint && focused)
  },

  renderMessage () {
    const props = this.props
    const state = this.state || {}
    let message

    const displayErrors = collectErrors(props) || collectErrors(state)

    let errors = this.state.hasError
      ? displayErrors || compact([props.errorMessage])
      : props.errors || []

    if (this.state.hasError && errors.length > 0) {
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
