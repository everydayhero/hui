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
    const { value } = this.state
    return (
      <div>
        <h3 className="DemoPage__h3" id="TextInput">PhoneInput</h3>
        <PhoneInput { ...props } value={ value } onChange={ this.handleChange } />
      </div>
    )
  }
})
