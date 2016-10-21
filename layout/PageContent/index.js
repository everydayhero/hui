'use strict'

import React from 'react'
import IconBanner from '../IconBanner'

export default React.createClass({
  displayName: 'PageContent',

  propTypes: {
    icon: React.PropTypes.string
  },

  getDefaultProps () {
    return { icon: 'heart-o' }
  },

  render () {
    let { children, icon } = this.props

    return (
      <div className={'PageContent'}>
        <IconBanner icon={icon} />
        { children }
      </div>
    )
  }
})
