'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'Masthead',

  propTypes: {
    href: React.PropTypes.string,
    appName: React.PropTypes.string,
    imagePath: React.PropTypes.string,
    desktopLogo: React.PropTypes.string,
    mobileLogo: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      root: '/'
    }
  },

  renderAppName () {
    const appName = this.props.appName

    if (appName) {
      return (
          <span className='hui-Masthead__appName'>
            { appName }
          </span>
        )
    } else {
      return false
    }
  },

  render () {
    const props = this.props
    const alt = ['everydayhero', props.appName].join(' ').trim()
    const desktopImagePath = props.imagePath
      ? props.imagePath + 'hui_edh_logo@x2.gif'
      : props.desktopLogo
    const mobileImagePath = props.imagePath
      ? props.imagePath + 'hui_edh_mark@x2.gif'
      : props.mobileLogo

    return (
      <h1 className='hui-Masthead'>
        <a href={props.href}>
          <img
            className='hui-Masthead__logo--desktop'
            src={desktopImagePath}
            alt={alt} />
          <img
            className='hui-Masthead__logo--mobile'
            src={mobileImagePath}
            alt={alt} />
          { this.renderAppName() }
        </a>
      </h1>
    )
  }
})
