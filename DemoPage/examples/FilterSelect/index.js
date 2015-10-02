'use strict';

import React from 'react'
import FilterSelect from '../../../forms/FilterSelect'

export default React.createClass({
  displayName: 'FilterSelectExample',

  render () {
    let options = [
      { label: 'Fred Hollows Foundation', value: '1' },
      { label: 'Australian Red Cross', value: '2' },
      { label: 'Indigenous Literacy Foundation', value: '3' },
      { label: 'Australian Men’s Shed Association', value: '4' },
      { label: 'Royal Flying Doctor Service', value: '5' },
      { label: 'Lifeline', value: '6' },
      { label: 'Fitted For Work', value: '7' },
      { label: 'Thin Green Line Foundation', value: '8' },
      { label: 'The Smith Family', value: '9' },
      { label: 'Exodus Foundation', value: '10' }
    ]

    return (
      <div>
        <h3 className="DemoPage__h3" id="FilterSelect">FilterSelect</h3>

        <FilterSelect
          value="2"
          options={ options } />
      </div>
    )
  }
})
