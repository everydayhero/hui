'use strict'

import React from 'react'
import OptionList from '../forms/OptionList'
import find from 'lodash/collection/find'

module.exports = React.createClass({
  displayName: 'Leaderboard',

  propTypes: {
    selectedId: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    rowComponent: React.PropTypes.func,
    rowData: React.PropTypes.array,
    valuePath: React.PropTypes.string,
    highlightedCharity: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      onSelect: () => {},
      highlightedCharity: '',
      valuePath: 'amount.cents'
    }
  },

  getSelected() {
    return find(this.props.rowData, (datum) => {
      let { id } = datum
      let { selectedId } = this.props
      if (!id || !selectedId) return undefined
      return id.toString() === selectedId.toString()
    })
  },

  prepareRows() {
    let {
      rowData,
      valuePath,
      valueType,
      valueSymbol,
      valueFormat
    } = this.props

    return rowData.map((data) => {
      let { id, name, charity_uid } = data
      return {
        id,
        name,
        charity_uid,
        data,
        valuePath,
        valueType,
        valueSymbol,
        valueFormat
      }
    })
  },

  render() {
    let {
      onSelect,
      highlightedCharity,
      rowComponent
    } = this.props

    return (
      <div className="hui-Leaderboard">
        <OptionList
          spacing="compact"
          options={ this.prepareRows() }
          valueKey="id"
          labelKey="name"
          highlightedKey="charity_uid"
          highlightedValue={ highlightedCharity }
          selectedOption={ this.getSelected() }
          onSelection={ onSelect }
          Display={ rowComponent } />
      </div>
    )
  }
})
