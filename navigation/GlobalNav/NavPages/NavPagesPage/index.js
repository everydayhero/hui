'use strict'

import React from 'react'
import I18n from '../../../../mixins/I18n'
import i18n from './i18n'

import Icon from '../../../../atoms/Icon'

import cx from 'classnames'

export default React.createClass({
  displayName: 'NavPagesPage',

  mixins: [I18n],

  propTypes: {
    page: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      charity_name: React.PropTypes.string.isRequired,
      campaign_name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      image: React.PropTypes.shape({
        small_image_url: React.PropTypes.string.isRequired
      }),
      campaign_uid: React.PropTypes.string.isRequired,
      expires_at: React.PropTypes.string.isRequired,
      state: React.PropTypes.string.isRequired,
      target_cents: React.PropTypes.number.isRequired,
      amount: React.PropTypes.shape({
        cents: React.PropTypes.number.isRequired,
        currency: React.PropTypes.shape({
          symbol: React.PropTypes.string.isRequired
        })
      })
    }).isRequired
  },

  renderProgress (page) {
    var progress = Math.min(Math.floor(page.amount.cents / page.target_cents * 100), 100) || 0

    return (
      <div className='hui-NavPagesPage__progress'>
        <div className='hui-NavPagesPage__progressBar' style={{ width: progress + '%' }} />
      </div>
    )
  },

  render () {
    let page = this.props.page
    let isBAU = page.campaign_uid.slice(-2) === '-0'
    let expired = new Date(page.expires_at) < new Date()
    let states = {
      active: { label: 'active', icon: '' },
      awaiting_consent: { label: 'pending', icon: 'ellipsis-h' },
      default: { label: 'disabled', icon: 'minus-circle' }
    }
    let pageState = expired ? states.default : states[page.state] || states.default
    let tm = this.tm
    let classes = cx('hui-NavPagesPage', 'hui-NavPagesPage--' + pageState.label)

    return (
      <a className={classes} href={page.url}>
        <div className='hui-NavPagesPage__image'>
          <Icon className='hui-NavPagesPage__icon' icon={pageState.icon} />
          <img src={page.image.small_image_url} />
          }
        </div>
        <div className='hui-NavPagesPage__details'>
          <div className='hui-NavPagesPage__name'>{ page.name }</div>
          { this.renderProgress(page) }
          <div className='hui-NavPagesPage__detail'>{ tm('raised', { currency: page.amount.currency.symbol, amount: page.amount.cents / 100 }) }</div>
          <div className='hui-NavPagesPage__detail'>{ tm('for', { charity: page.charity_name }) }</div>
          { !isBAU && <div className='hui-NavPagesPage__detail'>{ tm('through', { campaign: page.campaign_name }) }</div> }
        </div>
      </a>
    )
  },

  statics: {
    i18n
  }
})
