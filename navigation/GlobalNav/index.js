'use strict'

import React from 'react'

import SiteNav from './SiteNav'
import NavUser from './NavUser'

import urls from '../../urls'
import isEmpty from 'lodash/isEmpty'
import cx from 'classnames'

export default React.createClass({
  displayName: 'GlobalNav',

  propTypes: {
    region: React.PropTypes.string.isRequired,
    domain: React.PropTypes.string.isRequired,
    imgPath: React.PropTypes.string.isRequired,
    campaign: React.PropTypes.shape({
      name: React.PropTypes.string,
      detail: React.PropTypes.string,
      url: React.PropTypes.string
    }),
    user: React.PropTypes.object,
    transparent: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      user: {},
      campaign: {},
      transparent: false
    }
  },

  getInitialState () {
    return {
      menuOpen: false,
      user: this.props.user
    }
  },

  menuOpen (menuOpen) {
    this.setState({ menuOpen })
  },

  setUser (user) {
    this.setState({ user })
  },

  renderCampaign () {
    let campaign = this.props.campaign
    return (
      <a href={campaign.url} className='hui-GlobalNav__campaign'>
        <div className='hui-GlobalNav__campaignName'>{ campaign.name }</div>
        <div className='hui-GlobalNav__campaignDetail'>{ campaign.detail }</div>
      </a>
    )
  },

  renderLogo () {
    let props = this.props
    let logo = props.transparent ? 'hui_edh_logo@x2-reverse.png' : 'hui_edh_logo@x2.png'

    return (
      <a href={urls('portal', props.domain, props.region)} className='hui-GlobalNav__logo'>
        <img src={props.imgPath + logo} />
      </a>
    )
  },

  render () {
    let props = this.props
    let state = this.state
    let region = props.region
    let portal = urls('portal', props.domain, region)
    let hasUser = !isEmpty(state.user)
    let hasCampaign = !isEmpty(props.campaign)
    let classes = cx({
      'hui-GlobalNav--transparent': props.transparent,
      'hui-GlobalNav--menuOpen': state.menuOpen
    }, 'hui-GlobalNav')
    let navProps = {
      portal,
      hasUser,
      region,
      registerUrl: urls('register'),
      pages: state.user.page_ids
    }

    return (
      <div className={classes}>
        <div className='hui-GlobalNav__primary'>
          { (hasCampaign && !hasUser) ? this.renderCampaign() : this.renderLogo() }
          <SiteNav {...navProps} kind='desktop' transparent={props.transparent} />
          <NavUser transparent={props.transparent} domain={props.domain} region={region} user={state.user} onLoad={this.setuser} onMenuOpen={this.menuOpen} />
        </div>
        <div className='hui-GlobalNav__secondary'>
          <SiteNav {...navProps} kind='mobile' transparent={props.transparent} />
        </div>
      </div>
    )
  }
})

