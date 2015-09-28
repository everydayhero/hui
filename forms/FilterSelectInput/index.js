'use strict';

import React from 'react'
import OptionList from '../OptionList'
import TextInput from '../TextInput'

export default React.createClass({
  displayName: 'FilterSelectInput',

  propTypes: {
    options: React.PropTypes.array.isRequired,
    properties: React.PropTypes.array,
    Option: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      filterLabel: 'Filter',
      properties: ['label']
    }
  },

  getInitialState () {
    return {
      filteredOptions: this.props.options,
      selectedOption: null,
      filterValue: ''
    }
  },

  filter (filterValue) {
    let query = new RegExp(filterValue.split('').join('.*'), 'gi')

    return this.setState({
      filterValue,
      filteredOptions: this.props.options.filter((option) => {
        return this.props.properties.some((property) => {
          return option[property] && option[property].match(query)
        })
      })
    })
  },

  render () {
    return (
      <div>
        <TextInput
          ref="textInput"
          label={ this.props.filterLabel }
          value={ this.state.filterValue }
          onChange={ this.filter } />
        <OptionList
          className="FilterSelectInput__option-list"
          ref="optionList"
          Option={ this.props.Option }
          options={ this.state.filteredOptions } />
      </div>
    )
  }
})
