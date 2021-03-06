'use strict'

import React from 'react'
import Progress from './Progress'

export default React.createClass({
  displayName: 'Wizard',

  getDefaultProps: function () {
    return {
      children: [],
      currentStep: 0
    }
  },

  render: function () {
    var props = this.props
    return (
      <div className='hui-Wizard'>
        <Progress total={props.children.length} active={props.currentStep} onChange={props.onChange} />
        { props.children[props.currentStep] || props.children }
      </div>
    )
  }
})
