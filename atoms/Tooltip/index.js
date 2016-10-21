import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { addEventBindings, removeEventBindings } from '../../lib/eventUtils'
import Icon from '../Icon'
import TooltipContent from '../TooltipContent'

class Tooltip extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
    this.openTip = this.openTip.bind(this)
    this.closeTip = this.closeTip.bind(this)
  }

  openTip () {
    this.setState({ open: true })

    if (this.props.trigger === 'click') {
      addEventBindings('click', this.closeTip, document)
    }
  }

  closeTip () {
    this.setState({ open: false })

    if (this.props.trigger === 'click') {
      removeEventBindings('click', this.closeTip, document)
    }
  }

  render () {
    const { trigger } = this.props
    const classes = classNames({
      'hui-Tooltip': true,
      'hui-Tooltip--open': this.state.open,
      'hui-Tooltip--hoverable': trigger === 'hover',
      [this.props.className]: !!this.props.className
    })

    return (
      <div className={classes}>
        <div className='hui-Tooltip__trigger'
          onClick={trigger === 'click' && this.openTip}
          onMouseEnter={trigger === 'hover' && this.openTip}
          onMouseLeave={trigger === 'hover' && this.closeTip}>
          { this.props.children || <Icon icon='question-circle' className='hui-Tooltip__icon' /> }
        </div>
        <TooltipContent
          style={this.props.style}
          position={this.props.position}
          content={this.props.content}
          open={this.state.open} />
      </div>
    )
  }
}

Tooltip.displayName = 'Tooltip'
Tooltip.propTypes = {
  className: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover']),
  style: PropTypes.oneOf(['light', 'dark']),
  position: PropTypes.oneOf(['left', 'right', 'center']),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
}
Tooltip.defaultProps = {
  trigger: 'click',
  style: 'dark',
  position: 'left',
  content: ''
}

export default Tooltip
