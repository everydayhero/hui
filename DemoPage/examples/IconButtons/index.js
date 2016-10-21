import React, { createClass } from 'react'
import SquareButton from '../../../buttons/SquareButton'
import RoundButton from '../../../buttons/RoundButton'
import SpinningRays from '../../../atoms/SpinningRays'

const icons = ['chevron-left', 'times', 'check', 'chevron-right']

const flexStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden'
}

export default createClass({
  getInitialState () {
    return { active: '' }
  },

  handleClick (active) {
    return () => this.setState({ active })
  },

  render () {
    const { active } = this.state
    return (
      <div>
        <h3 className='DemoPage__h3' id='IconButtons'>IconButtons (also SpinningRays)</h3>
        <div style={flexStyle}>
          <SpinningRays />
          <SquareButton icon={icons[0]} active={active === icons[0]} size='small' onClick={this.handleClick(icons[0])} />
          <SquareButton icon={icons[1]} active={active === icons[1]} onClick={this.handleClick(icons[1])} />
          <RoundButton icon={icons[2]} active={active === icons[2]} onClick={this.handleClick(icons[2])} />
          <RoundButton icon={icons[3]} active={active === icons[3]} size='small' onClick={this.handleClick(icons[3])} />
        </div>
      </div>
    )
  }
})
