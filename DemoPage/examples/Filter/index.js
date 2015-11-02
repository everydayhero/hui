'use strict';

import React from 'react'
import Filter from '../../../forms/Filter'

const collection = [
  {
    name: 'Fred Hollows Foundation',
    summary: 'Improving Indigenous Health'
  },
  {
    name: 'Australian Red Cross',
    summary: 'People Helping People'
  },
  {
    name: 'Indigenous Literacy Foundation',
    summary: 'address literacy levels in remote communities'
  },
  {
    name: 'Australian Men’s Shed Association',
    summary: 'Shoulder To Shoulder'
  },
  {
    name: 'Royal Flying Doctor Service',
    summary: 'The Furthest Corner. The Finest Care'
  },
  {
    name: 'Lifeline',
    summary: 'Crisis Support. Suicide Prevention'
  },
  {
    name: 'Fitted For Work',
    summary: 'Helping Women Find Work And Keep It'
  },
  {
    name: 'Thin Green Line Foundation',
    summary: 'We Protect Nature’s Protectors'
  },
  {
    name: 'The Smith Family',
    summary: 'Everyone\'s Family'
  },
  {
    name: 'Exodus Foundation',
    summary: 'You Can Make a Difference'
  }
]

export default React.createClass({
  displayName: 'FilterExample',

  getInitialState () {
    return {
      filtered: collection
    }
  },

  handleFilter (results) {
    this.setState({
      filtered: results
    })
  },

  render () {
    return (
      <div>
        <h3 className="DemoPage__h3" id="Filter">Filter</h3>

        <Filter
          label="You can search both the name and summary"
          onFilter={ this.handleFilter }
          properties={ ['name', 'summary'] }
          collection={ collection } />

        <div className="DemoPage__pre-wrap">
          <pre className="DemoPage__pre">{ JSON.stringify(this.state.filtered, null, 2) }</pre>
        </div>
      </div>
    )
  }
})
