'use strict'

import React from 'react'
import TagList from '../../../forms/TagList'
var items = [
  { id: '1', name: 'American Red Cross' },
  { id: '2', name: 'Save the Animals' },
  { id: '3', name: 'A really long name for a charity' },
  { id: '4', name: 'Australian Red Cross' },
  { id: '5', name: 'Rspca Australia' },
  { id: '6', name: 'Save the children' },
  { id: '7', name: 'World Vision Australia' },
  { id: '8', name: 'Another really long name for a charity' }
]
var counter = items.length

export default React.createClass({
  displayName: 'TagListExample',

  getInitialState: function () {
    return {
      charities: items
    }
  },

  onItemRemoved: function (data) {
    this.setState({ charities: data })
  },

  addItem: function () {
    var charityId = (++counter).toString()
    var charityName = 'charity ' + charityId
    var charityItems = this.state.charities

    charityItems.push({ id: charityId, name: charityName })
    this.setState({ charities: charityItems })
  },

  render: function () {
    return (
      <div>
        <h3 className='DemoPage__h3' id='TagList'>TagList</h3>
        <p className='DemoPage__p'>Basic Tag List.</p>
        <TagList
          layout='full'
          spacing='fitted'
          id='charities'
          onItemIconClicked={this.onItemRemoved}
          items={this.state.charities} />
        <button id='add' onClick={this.addItem} >Add Charity</button>
      </div>
    )
  }
})
