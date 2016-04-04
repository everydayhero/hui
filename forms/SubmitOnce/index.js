'use strict'

import React from 'react'
import Button from '../../buttons/Button'

const defaults = {
  kind: 'cta',
  type: 'submit'
}

export default React.createClass({
  displayName: 'SubmitOnce',

  propTypes: {
    formId: React.PropTypes.string
  },

  getDefaultProps () {
    return { formId: '' }
  },

  getInitialState () {
    return { submitted: false }
  },

  handleClick (e) {
    e.preventDefault()
    let { onClick, formId } = this.props
    if (!this.state.submitted) {
      !!onClick && onClick(e)
      !!formId && document.forms[formId].submit(e)
    }
    this.setState({ submitted: true })
  },

  render () {
    let { props, state, handleClick } = this
    let icon = props.icon ? props.icon : state.submitted ? 'refresh' : ''
    return <Button { ...defaults } { ...props } icon={ icon } onClick={ handleClick } />
  }
})
