'use strict'

import React from 'react'
import Button from '../../buttons/Button'
import Share from '../../buttons/Share'
import ProgressBar from '../../atoms/ProgressBar'
import classnames from 'classnames'
import _ from 'lodash'
import addEventListener from '../../lib/addEventListener'
import removeEventListener from '../../lib/removeEventListener'
import i18n from './i18n'
import i18nMixin from '../../mixins/I18n'
import numeric from '../../lib/numeric'

export default React.createClass({
  displayName: 'LeaderboardRow',

  mixins: [i18nMixin],

  propTypes: {
    shareUrl: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    onView: React.PropTypes.func,
    index: React.PropTypes.number,
    data: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      charity_name: React.PropTypes.string.isRequired,
      target_cents: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired,
      share_url: React.PropTypes.string,
      rank: React.PropTypes.number.isRequired,
      amount: React.PropTypes.shape({
        cents: React.PropTypes.number.isRequired,
        currency: React.PropTypes.shape({
          symbol: React.PropTypes.string
        })
      }).isRequired,
      image: React.PropTypes.shape({
        medium_image_url: React.PropTypes.string
      }).isRequired
    }).isRequired,
    isSelected: React.PropTypes.bool,
    isCandidate: React.PropTypes.bool,
    isHighlighted: React.PropTypes.bool,
    valueType: React.PropTypes.oneOf(['money', 'distance']),
    valueSymbol: React.PropTypes.oneOf(['$', '£', '€', 'km', 'mi', 'm']),
  },

  getDefaultProps: function() {
    return {
      valueType: 'money',
      valueSymbol: '$',
      valuePath: 'amount.cents',
      valueFormat: '0.00',
      data: {},
      isHighlighted: false,
      isCandidate: false,
      isSelected: false
    }
  },

  getInitialState: function() {
    return {
      narrow: false
    }
  },

  componentDidMount: function() {
    this.handleResizeDebounce = _.debounce(this.handleResize, 300, { maxWait: 1000 });
    addEventListener('resize', this.handleResizeDebounce);
    this.handleResize();
  },

  componentWillUnmount: function() {
    removeEventListener('resize', this.handleResizeDebounce);
  },

  handleResize: function() {
    let domNode = this.getDOMNode()
    this.setState({
      narrow: domNode.offsetWidth <= 460
    });
  },

  renderFlipper: function() {
    let props = this.props
    let data = props.data
    let symbol = data.amount.currency.symbol
    let formattedRaised = numeric.money(symbol, data.amount.cents, '0.00')
    let formattedGoal = numeric.money(symbol, data.target_cents, '0.00')

    return (
      <div className="hui-LeaderboardRow__flipContainer">
        <div className="hui-LeaderboardRow__flipper">

          <div className="hui-LeaderboardRow__stats">
            <ProgressBar goal={ data.target_cents } progress={ data.amount.cents } />
            <div className="hui-LeaderboardRow__raised">
              { formattedRaised } { this.t('raise_join') } { formattedGoal } { this.t('goal') }
            </div>
          </div>

          <div className="hui-LeaderboardRow__ctas">
            <Button kind="primary" inverse slim icon="heart" href={ data.url }>Give</Button>
            <Button kind="primary" inverse slim icon="chevron-right" onClick={ props.onView }>View Team</Button>
            { !!data.share_url && <Share kind="facebook" inverse slim label="Share" shareUrl={ data.share_url } /> }
          </div>
        </div>
      </div>
    )
  },

  renderRank: function() {
    return <div className="hui-LeaderboardRow__rank">{ this.props.data.rank }</div>
  },

  render: function() {
    let props = this.props
    let data = props.data
    let value = numeric[props.valueType](props.valueSymbol, _.get(data, props.valuePath), props.valueFormat)
    let state = this.state
    let classes = classnames([
      'hui-LeaderboardRow',
      props.isSelected && 'hui-LeaderboardRow--selected',
      props.isCandidate && 'hui-LeaderboardRow--candidate',
      props.isHighlighted && 'hui-LeaderboardRow--highlighted',
      this.state.narrow && 'hui-LeaderboardRow--narrow'
    ])

    return (
      <div className={ classes }>
        { !state.narrow && this.renderRank() }
        <div className="hui-LeaderboardRow__avatar">
          <img src={ data.image.medium_image_url }/>
        </div>
        <div className="hui-LeaderboardRow__details">
          { state.narrow && this.renderRank() }
          <h2 className="hui-LeaderboardRow__pageName">
            { data.name }
          </h2>
          <p className="hui-LeaderboardRow__charityName">
            { data.charity_name }
          </p>
          { !state.narrow && this.renderFlipper() }
        </div>
        <div className="hui-LeaderboardRow__value">
          { value }
        </div>
        { state.narrow && this.renderFlipper() }
      </div>
    )
  },

  statics: {
    i18n
  }
})
