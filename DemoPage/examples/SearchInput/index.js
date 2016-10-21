'use strict'

import React from 'react'
import SearchInput from '../../../forms/SearchInput'
import formMixin from '../../../mixins/reactForm.mixin'

export default React.createClass({
  displayName: 'SearchInputExample',

  mixins: [formMixin],

  t: function (name) {
    let translation = {
      'search_01_label': 'Search',
      'search_01_hint': 'Search for something',
      'search_01_tip': 'What do you want to search for?'
    }

    return (translation[name])
  },

  onSubmit: function (searchTerm) {
    alert('You searched for ' + searchTerm)
  },

  render: function () {
    let change = this.inputChangeEventFn

    return (
    <div>
      <h3 className='DemoPage__h3' id='SearchInput'>SearchInput</h3>

      { this.searchInput('search_01', { onSubmit: this.onSubmit }) }

      <SearchInput
        onChange={change('search')}
        onSubmit={this.onSubmit}
        label='Search for something'
        value={this.state.form.search} />
    </div>
    )
  }
})
