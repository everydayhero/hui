import React, { createClass } from 'react'
import RadioGroup from '../../../forms/RadioGroup'

const props = {
  name: 'RadioGroupExample',
  labels: ['One fish', 'Two fish', 'Red fish', 'Blue fish']
}

const flexStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default createClass({
  getInitialState () {
    return {
      value: '',
      hasFocus: false
    }
  },

  handleFocus (hasFocus) {
    return () => this.setState({ hasFocus })
  },

  handleChange (value) {
    this.setState({ value })
  },

  render () {
    const { value, hasFocus } = this.state
    return (
      <div>
        <h3 className='DemoPage__h3' id='RadioGroup'>RadioGroup</h3>
        <div style={flexStyle}>
          <RadioGroup {...props} value={value} hasFocus={hasFocus} onChange={this.handleChange} onFocus={this.handleFocus(true)} onBlur={this.handleFocus(false)} />
        </div>
      </div>
    )
  }
})
