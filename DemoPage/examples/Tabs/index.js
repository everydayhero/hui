'use strict'

import React from 'react'
import Tabs from '../../../navigation/Tabs'
import Pagination from '../../../navigation/Pagination'

export default React.createClass({
  displayName: 'TabsExample',

  getInitialState () {
    return {
      active: 0,
      currentPage: 0,
      count: 3
    }
  },

  handleChange (active) {
    this.setState({
      active
    })
  },

  onPage: function(increment) {
    let currentPage = this.state.currentPage + increment
    this.setState({ currentPage })
  },

  render: function() {
    let state = this.state
    let tabs = [
      {
        label: 'Raise',
        content: (
          <div key="raised">
            <p>Amount raised goes here</p>
            <p>On Page: { state.currentPage }</p>
            <Pagination {...state} onChange={ this.onPage } />
          </div>
        )
      },
      {
        label: 'Distance',
        content: <p key="distance">Distance goes here</p>
      },
      {
        label: 'Elevation',
        content: <p key="elevation">Elevation goes here</p>
      }
    ]

    return (
      <div>
        <h3 className="DemoPage__h3" id="Tabs">Tabs</h3>
        <Tabs onChange={ this.handleChange } active={ this.state.active } tabs={ tabs }/>
      </div>
    )
  }
})
