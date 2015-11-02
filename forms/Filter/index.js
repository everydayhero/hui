'use strict'

import React from 'react'
import textInputProps from '../../mixins/textInputProps'
import Input from '../TextInput'

export default React.createClass({
  displayName: 'Filter',

  propTypes: {
    filterValue: React.PropTypes.string,
    inputOptions: React.PropTypes.shape(textInputProps.types),
    collection: React.PropTypes.array,
    properties: React.PropTypes.array,
    onFilter: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      filterValue: '',
      inputOptions: textInputProps.defaults,
      collection: [],
      properties: ['name'],
      onFilter: () => {},
      onChange: () => {}
    }
  },

  getInitialState () {
    return {
      filterValue: this.props.filterValue
    }
  },

  filter (filterValue) {
    const query   = new RegExp(filterValue.split('').join('.*'), 'gi')
    const results = this.props.collection.filter((option) => {
      return this.props.properties.some((property) => {
        return !!option[property] && option[property].match(query)
      })
    })

    this.props.onFilter(results)

    this.setState({
      filterValue
    }, () => {
      this.props.onChange(filterValue)
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
