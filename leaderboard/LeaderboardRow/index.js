'use strict'

import React from 'react'
import Button from '../../buttons/Button'
import ProgressBar from '../../atoms/ProgressBar'
import numeral from 'numeral'
import classnames from 'classnames'
import _ from 'lodash'
import addEventListener from '../../lib/addEventListener'
import removeEventListener from '../../lib/removeEventListener'
import i18n from './i18n'
import i18nMixin from '../../mixins/I18n'
import numeric from '../../lib/numeric'

module.exports = React.createClass({
  displayName: 'LeaderboardRow',

  mixins: [i18nMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    onView: React.PropTypes.func,
    index: React.PropTypes.number,
    data: React.PropTypes.object,
    isSelected: React.PropTypes.bool,
    valueType: React.PropTypes.oneOf(['money', 'distance']),
    valueSymbol: React.PropTypes.oneOf(['$', '£', '€', 'km', 'mi', 'm']),
  },

  getDefaultProps: function() {
    return {
      valueType: 'money',
      valueSymbol: '$',
      valuePath: 'amount.cents',
      data: {},
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
      narrow: domNode.offsetWidth <= 600
    });
  },

  onSelect: function() {
    let props = this.props
    props.onSelect && props.onSelect(props.data, props.index)
  },

  onMouseOut: function() {
    let props = this.props
    props.onMouseOut && props.onMouseOut()
  },

  renderFlipper: function() {
    let props = this.props
    let data = props.data
    let symbol = data.amount.currency.symbol
    let formattedRaised = numeric.money(symbol, data.amount.cents)
    let formattedGoal = numeric.money(symbol, data.target_cents)

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
            <Button kind="primary" inverse={ true } icon="heart" href={ data.url } slim={ true }>Give</Button>
            <Button kind="primary" inverse={ true } icon="chevron-right" slim={ true } onView={ props.onView }>View Team</Button>
          </div>

        </div>
      </div>
    )
  },

  renderRank: function() {
    let formattedRank = numeral(this.props.index + 1).format('0o')

    return <div className="hui-LeaderboardRow__rank">{ formattedRank }</div>
  },

  render: function() {
    let props = this.props
    let data = props.data
    let value = numeric[props.valueType](props.valueSymbol, _.get(data, props.valuePath))
    let state = this.state
    let classes = classnames([
      'hui-LeaderboardRow',
      props.isSelected && 'hui-LeaderboardRow--selected',
      this.state.narrow && 'hui-LeaderboardRow--narrow'
    ])

    return (
      <div className={ classes } onClick={ this.onSelect } onMouseOver={ this.onSelect } onMouseOut={ this.onMouseOut }>
        { !state.narrow && this.renderRank() }
        <img src={ data.image.medium_image_url } className="hui-LeaderboardRow__avatar"/>
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
