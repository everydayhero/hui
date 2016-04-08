'use strict'

import React from 'react'
import I18n from '../../mixins/I18n'
import i18n from './i18n'
import AggregateSearchResult from '../AggregateSearchResult'

export default React.createClass({
  displayName: 'AggregateSearchResultCampaign',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  renderDate() {
    let campaign = this.props.result
    if (!campaign.display_start_at) {
      return <div className="AggregateSearchResultCampaign__date" />
    }

    let date = new Date(campaign.display_start_at)
    return (
      <ul className="AggregateSearchResultCampaign__date">
        <li>{ date.getDate() }</li>
        <li>{ this.t('months')[date.getMonth()] }</li>
        <li>{ date.getFullYear() }</li>
      </ul>
    )
  },

  renderNumSupporters() {
    let campaign = this.props.result
    return campaign.page_count >= 20 && (
      <span className="AggregateSearchResultCampaign__supporters">
        { this.t('numSupporters', { count: campaign.page_count }) }
      </span>
    )
  },

  renderNumCharities() {
    let campaign = this.props.result
    return campaign.charity_count >= 0 && (
      <span className="AggregateSearchResultCampaign__charities">
        { this.t('numCharities', { count: campaign.charity_count }) }
      </span>
    )
  },

  render() {
    let campaign = this.props.result
    let url = campaign.url || campaign.get_started_url

    return (
      <AggregateSearchResult url={ url } onSelect={ this.props.onSelect }>
        { this.renderDate() }
        <div className="AggregateSearchResultCampaign__content">
          <div className="AggregateSearchResultCampaign__header">{ campaign.name }</div>
          <div className="AggregateSearchResultCampaign__subheader">
            { this.renderNumSupporters() }
            { this.renderNumCharities() }
          </div>
          <p className="AggregateSearchResultCampaign__description">{ campaign.description }</p>
        </div>
      </AggregateSearchResult>
    )
  },

  statics: {
    i18n
  }
})
