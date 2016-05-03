'use strict'

import React from 'react'
import PhoneInput from '../../../forms/PhoneInput'

const props = {
  autoComplete: false,
  required: true,
  id: 'phone_input',
  name: 'phone',
  label: 'Phone Number',
  errorMessage: 'A valid phone number is required'
}

export default React.createClass({
  displayName: 'PhoneInputExample',

  getInitialState() {
    return { value: '' }
  },

  handleChange(value) {
    this.setState({ value })
    console.log('Handling PhoneInput Change', value)
  },

  render() {
    return (
      <PhoneInput { ...props } onChange={ this.handleChange } />
    )
  }
})
