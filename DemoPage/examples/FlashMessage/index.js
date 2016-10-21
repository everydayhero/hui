'use strict'

import React from 'react'
import FlashMessage from '../../../atoms/FlashMessage'
import Button from '../../../buttons/Button'

export default React.createClass({
  displayName: 'FlashMessageExample',

  getInitialState: function () {
    return {
      show: false
    }
  },

  triggerError: function () {
    this.setState({
      show: true,
      message: 'Something went horribly wrong.',
      type: 'error'
    })
  },

  triggerAlert: function () {
    this.setState({
      show: true,
      message: 'You should really know about this.',
      type: 'alert'
    })
  },

  triggerSuccess: function () {
    this.setState({
      show: true,
      message: 'Something good happened.',
      type: 'success'
    })
  },

  dismiss: function () {
    this.setState({ show: false })
  },

  render: function () {
    var state = this.state

    return (
      <div>
        <h3 className='DemoPage__h3' id='LoadingProgress'>Flash Message</h3>
        <Button kind='secondary' onClick={this.triggerError}>Trigger Error</Button>
        <Button kind='secondary' onClick={this.triggerAlert}>Trigger Alert</Button>
        <Button kind='secondary' onClick={this.triggerSuccess}>Trigger Success</Button>
        <div className='DemoPage__example'>
          <FlashMessage
            {...state}
            onDismiss={this.dismiss} />
        </div>
      </div>
    )
  }
})
