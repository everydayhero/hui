'use strict'

import React from 'react'
import Button from '../../buttons/Button'
import ProgressBar from '../../atoms/ProgressBar'
import numeral from 'numeral'
import classnames from 'classnames'
import _ from 'lodash'

let formater = {
  money: function(symbol, cents) {
    cents = cents || 0
    return symbol + numeral(cents / 100).format('0.00')
  },

  distance: function(symbol, distance) {
    return  numeral(distance).format('0') + symbol
  }
}

module.exports = React.createClass({
  displayName: 'LeaderboardRow',

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

  onSelect: function() {
    let props = this.props
    props.onSelect && props.onSelect(props.data, props.index)
  },

  onMouseOut: function() {
    let props = this.props
    props.onMouseOut && props.onMouseOut()
  },

  render: function() {
    let props = this.props
    let data = props.data
    let symbol = data.amount.currency.symbol
    let formattedRank = numeral(props.index + 1).format('0o')
    let formattedRaised = formater.money(symbol, data.amount.cents)
    let formattedGoal = formater.money(symbol, data.target_cents)
    let value = formater[props.valueType](props.valueSymbol, _.get(data, props.valuePath))

    let classes = classnames([
      'hui-LeaderboardRow',
      props.isSelected && 'hui-LeaderboardRow--selected'
    ])

    return (
      <div className={ classes } onClick={ this.onSelect } onMouseOver={ this.onSelect } onMouseOut={ this.onMouseOut }>
        <div className="hui-LeaderboardRow__rank">{ formattedRank }</div>
        <img src={ data.image.medium_image_url } className="hui-LeaderboardRow__avatar"/>
        <div className="hui-LeaderboardRow__details">
          <h2 className="hui-LeaderboardRow__pageName">
            { data.name }
          </h2>
          <p className="hui-LeaderboardRow__charityName">
            { data.charity_name }
          </p>
          <div className="hui-LeaderboardRow__flipContainer">
            <div className="hui-LeaderboardRow__flipper">

              <div className="hui-LeaderboardRow__stats">
                <ProgressBar goal={ data.target_cents } progress={ data.amount.cents } />
                <div className="hui-LeaderboardRow__raised">
                  { formattedRaised } raised of { formattedGoal } goal
                </div>
              </div>

              <div className="hui-LeaderboardRow__ctas">
                <Button kind="primary" inverse={ true } icon="heart" href={ data.url } slim={ true }>Give</Button>
                <Button kind="primary" inverse={ true } icon="chevron-right" slim={ true } onView={ props.onView }>View Team</Button>
              </div>

            </div>
          </div>

        </div>
        <div className="hui-LeaderboardRow__value">
          { value }
        </div>
      </div>
    )
  }
})
