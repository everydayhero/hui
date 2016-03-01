'use strict'

import React from 'react'
import I18n from '../../mixins/I18n'
import i18n from './i18n'
import { isGivePage } from '../../lib/search'
import AggregateSearchResult from '../AggregateSearchResult'

export default React.createClass({
  displayName: 'AggregateSearchResultPage',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  renderProgressBar() {
    let page = this.props.result
    let progress = page.amount && page.target_cents > 0 &&
      Math.min(Math.floor(page.amount.cents / page.target_cents * 100), 100) || 0

    return (
      <div className="AggregateSearchResultPage__progress">
        <div className="AggregateSearchResultPage__progress__bar" style={{ width: progress + '%' }} />
      </div>
    )
  },

  renderRaisedAmount() {
    let page = this.props.result
    let raised_amount = page.amount && page.target_cents >= 0 &&
      this.tm('raised_amount', {
        currency: page.amount.currency.symbol,
        amount: page.amount.cents / 100,
        target: page.target_cents / 100
      })

    return !!raised_amount && <div className="AggregateSearchResultPage__amount">{ raised_amount }</div>
  },

  renderRaisedFor() {
    let page = this.props.result
    let raised_for =
      this.tm(isGivePage(page) ? 'raised_for_charity' : 'raised_for_charity_through_campaign', {
        charity: page.charity.name,
        campaign: page.campaign.name
      })

    return <div className="AggregateSearchResultPage__for">{ raised_for }</div>
  },

  render() {
    let page = this.props.result

    return (
      <AggregateSearchResult url={ page.url } onSelect={ this.props.onSelect }>
        <div className="AggregateSearchResultPage__avatar">
          <img src={ page.image.medium_image_url } />
        </div>
        <div className="AggregateSearchResultPage__content">
          <div className="AggregateSearchResultPage__header">
            { page.supporter.name }
            <span className="AggregateSearchResultPage__subheader">{ page.name }</span>
          </div>
          { this.renderProgressBar() }
          { this.renderRaisedAmount() }
          { this.renderRaisedFor() }
        </div>
      </AggregateSearchResult>
    )
  },

  statics: {
    i18n
  }
})
