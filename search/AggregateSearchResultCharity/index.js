'use strict'

import React from 'react'
import Icon from '../../atoms/Icon'
import I18n from '../../mixins/I18n'
import AggregateSearchResult from '../AggregateSearchResult'

export default React.createClass({
  displayName: 'AggregateSearchResultCharity',

  mixins: [I18n],

  propTypes: {
    result: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  renderLogo() {
    let charity = this.props.result;

    return !!charity.logo_url && (
      <div className="AggregateSearchResultCharity__logo">
        <img src={ charity.logo_url } />
      </div>
    );
  },

  renderAvatar() {
    return (
      <div className="AggregateSearchResultCharity__avatar">
        <Icon icon={ 'heart-o' } fixedWidth={ true } />
      </div>
    );
  },

  renderNumSupporters() {
    let charity = this.props.result;

    return charity.page_count >= 20 && (
      <span className="AggregateSearchResultCharity__supporters">
        { this.t('numSupporters', { count: charity.page_count }) }
      </span>
    );
  },

  render() {
    let charity = this.props.result;

    return (
      <AggregateSearchResult url={ charity.url } onSelect={ this.props.onSelect }>
        { this.renderLogo() || this.renderAvatar() }
        <div className="AggregateSearchResultCharity__content">
          <div className="AggregateSearchResultCharity__header">{ charity.name }</div>
          <div className="AggregateSearchResultCharity__subheader">
            { this.renderNumSupporters() }
          </div>
          <p className="AggregateSearchResultCharity__description">{ charity.description }</p>
        </div>
      </AggregateSearchResult>
    );
  },

  statics: {
    i18n: require('./i18n')
  }
});
