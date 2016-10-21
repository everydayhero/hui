'use strict'

import React from 'react'
import Icon from '../../atoms/Icon'

export default React.createClass({
  displayName: 'IconBanner',

  propTypes: {
    icon: React.PropTypes.string
  },

  getDefaultProps () {
    return { icon: 'heart-o' }
  },

  render () {
    let { icon } = this.props

    return (
      <div className={'IconBanner'}>
        <Icon className={'IconBanner__icon'} icon={icon} />
      </div>
    )
  }
})
