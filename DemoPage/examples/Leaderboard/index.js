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

  getShareUrl: function (id) {
    if (typeof location === 'undefined') { return '' }

    let { protocol, host } = location
    return `${protocol}//${host}/#/tracker/team/${ id }`
  },

  render: function() {
    let onSelect  = this.onSelect
    let rowData = raisedData.leaderboard.pages
    rowData.forEach((item, index) => {
      item.rank = index + 1
      item.share_url = this.getShareUrl(item.uid)
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
          highlightedCharity="au-1795"
          rowComponent={ LeaderboardRow } />
      </div>
    )
  }
})
