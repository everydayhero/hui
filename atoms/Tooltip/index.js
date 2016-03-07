'use strict'

import React from 'react'
import { addListeners, removeListeners } from '../../lib/bindEvents'
import cx from 'classnames'
import Icon from '../Icon'

export default React.createClass({
  displayName: 'Tooltip',

  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    side: React.PropTypes.oneOf(['left', 'right'])
  },

  getDefaultProps() {
    return {
      side: 'left'
    }
  },

  getInitialState() {
    return {
      open: false
    }
  },

  openTip() {
    this.setState({ open: true })
    addListeners('click', this.closeTip, document)
  },

  closeTip() {
    this.setState({ open: false })
    removeListeners('click', this.closeTip, document)
  },

  render() {
    var props = this.props
    var classes = cx({
      'Tooltip': true,
      'Tooltip--open': this.state.open
    })
    var tipClasses = cx({
      'Tooltip__tip': true,
      'Tooltip__tip--left': props.side === 'left',
      'Tooltip__tip--right': props.side === 'right'
    })

    return (
      <div className={ classes + ' ' + props.className } onClick={ this.openTip }>
        <Icon icon="question-circle" className="Tooltip__icon" />
        <div className={ tipClasses }>
          <div className="Tooltip__tip__text">
            { props.text }
          </div>
        </div>
      </div>
    )
  }
})
