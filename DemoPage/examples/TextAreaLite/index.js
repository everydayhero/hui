import React, { createClass } from 'react'
import TextAreaLite  from '../../../forms/TextAreaLite'

const props = {
  placeholder: 'This is the placeholder',
  minRows: 4
}

export default createClass({
  getInitialState() {
    return {
      value: '',
      hasFocus: false
    }
  },

  handleChange({ target: { value }}) {
    this.setState({ value })
  },

  handleFocus(hasFocus) {
    return () => this.setState({ hasFocus })
  },

  render: function() {
    const { value, hasFocus } = this.state
    return (
      <div>
        <h3 className="DemoPage__h3" id="TextAreaLite">TextAreaLite</h3>
        <TextAreaLite { ...props } value={ value } hasFocus={ hasFocus } onChange={ this.handleChange } onFocus={ this.handleFocus(true) } onBlur={ this.handleFocus(false) } />
      </div>
    )
  }
})
