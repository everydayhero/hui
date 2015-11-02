'use strict'

import React from 'react'
// import I18n from '../../mixins/i18n'
import textInputProps from '../../mixins/textInputProps'
import Input from '../TextInput'

export default React.createClass({
  displayName: 'Filter',

  propTypes: {
    inputOptions: React.PropTypes.shape(textInputProps.types),
    collection: React.PropTypes.array,
    properties: React.PropTypes.array,
    onFilter: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      inputOptions: textInputProps.defaults,
      collection: [],
      properties: ['name'],
      onFilter: () => {}
    }
  },

  getInitialState () {
    return { filterValue: '' }
  },

  filter (filterValue) {
    const query   = new RegExp(filterValue.split('').join('.*'), 'gi')
    const results = this.props.collection.filter((option) => {
      return this.props.properties.some((property) => {
        return option[property] && option[property].match(query)
      })
    })

    this.props.onFilter(results)
    this.setState({
      filterValue
    })
  },

  render () {
    return (
      <Input
        { ...this.props.inputOptions }
        value={ this.state.filterValue }
        ref="filterInput"
        onChange={ this.filter }
        label={ this.props.label } />
    )
  }
})
