'use strict'

import React       from 'react'
import Leaderboard from '../../../leaderboard'
import LeaderboardRow from '../../../leaderboard/LeaderboardRow'
import raisedData from './raisedData.json'

module.exports = React.createClass({
  displayName: 'Leaderboard',

  getInitialState: function() {
    return {
      selectedIndex: null
    }
  },

  onSelect: function(item, index) {
    this.setState({
      selectedIndex: index
    })
  },

  render: function() {
    let onSelect  = this.onSelect
    let rowData = raisedData.leaderboard.pages
    rowData.forEach(function(item, index){
      item.rank = index + 1
    })

    return (
      <div>
        <h3 className="DemoPage__h3" id="Leaderboard">Leaderboard</h3>

        <Leaderboard
          onSelect={ onSelect }
          selectedIndex={ this.props.selectedIndex }
          rowData={ raisedData.leaderboard.pages }
          valueSymbol="$"
          valueType="money"
          rowComponent={ LeaderboardRow } />
      </div>
    )
  }
})
