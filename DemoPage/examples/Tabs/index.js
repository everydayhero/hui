'use strict'

import React from 'react'
import Tabs from '../../../layout/Tabs'

export default React.createClass({
  displayName: 'TabsExample',

  getInitialState () {
    return {
      active: 0
    }
  },

  handleChange (active) {
    this.setState({
      active
    })
  },

  render: function() {
    let tabs = [
      {
        label: 'Raise',
        content: <p>Amount raised goes here</p>
      },
      {
        label: 'Distance',
        content: <p>Distance goes here</p>
      },
      {
        label: 'Elevation',
        content: <p>Elevation goes here</p>
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
