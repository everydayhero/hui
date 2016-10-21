'use strict'

import React from 'react'
import Icon from '../Icon'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'FlashMessage',
  propTypes: {
    type: React.PropTypes.string,
    message: React.PropTypes.string,
    show: React.PropTypes.bool,
    onDismiss: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      show: false
    }
  },

  render: function () {
    var props = this.props
    var type = props.type || 'success'
    var messageClasses = 'hui-FlashMessage__message ' + 'hui-FlashMessage__message--' + type
    var classes = classnames({ 'hui-FlashMessage--show': props.show }, 'hui-FlashMessage')
    var icons = {
      'success': 'check',
      'alert': 'warning',
      'error': 'bomb'
    }

    return (
      <div className={classes}>
        <div className={messageClasses}>
          <Icon icon={icons[type]} className='hui-FlashMessage__icon' />
          { props.message }
          <button onClick={this.props.onDismiss} className='hui-FlashMessage__dismiss'>
            <Icon icon='times' />
          </button>
        </div>
      </div>
    )
  }
})
