'use strict'

import React from 'react'
import FilterSelect from '../../../forms/FilterSelect'

import faker from 'faker'

export default React.createClass({
  displayName: 'FilterSelectExample',

  render () {
    let options = Array.from({ length: 6000 }).map((_e, i) => {
      return {
        label: faker.name.findName(),
        value: (i + 1).toString()
      }
    })

    return (
      <div>
        <h3 className="DemoPage__h3" id="FilterSelect">FilterSelect</h3>

        <FilterSelect
          required
          errorMessage="Please select an option"
          value=" "
          options={ options } />

        <FilterSelect
          label={ null }
          value="2"
          options={ options } />
      </div>
    )
  }
})
