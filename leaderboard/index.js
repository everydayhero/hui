'use strict'

import React from 'react'

module.exports = React.createClass({
  displayName: 'Leaderboard',

  propTypes: {
    onSelect: React.PropTypes.func,
    rowComponent: React.PropTypes.func,
    rowData: React.PropTypes.array,
    valuePath: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      valuePath: 'amount.cents'
    }
  },

  getInitialState: function() {
    return {
      selectedIndex: -1
    }
  },

  onSelect: function(item, index) {
    let onSelect = this.props.onSelect
    this.setState({
      selectedIndex: index
    })

    onSelect && onSelect(item, index)
  },

  onMouseLeave: function() {
    let onDeSelect = this.props.onDeSelect
    this.setState({
      selectedIndex: -1
    })

    onDeSelect && onDeSelect()
  },

  renderRows: function() {
    let component = this
    let props = component.props
    let rows = [];

    props.rowData.forEach(function(data, index) {
      let row = {
        data,
        onSelect: component.onSelect,
        onMouseLeave: component.onMouseLeave,
        valuePath: props.valuePath,
        valueType: props.valueType,
        valueSymbol: props.valueSymbol,
        valueFormat: props.valueFormat,
        index,
        isSelected: component.state.selectedIndex === index
      }

      rows.push(
        <div key={ index } className="hui-Leaderboard__row">
          { React.createFactory(props.rowComponent)(row) }
        </div>
      )
    })

    return rows
  },

  render: function() {
    return (
      <div className="hui-Leaderboard">
        { this.renderRows() }
      </div>
    )
  }
})
