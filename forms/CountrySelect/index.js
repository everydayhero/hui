'use strict'

import React from 'react'
import FilterSelect from '../FilterSelect'
import CountrySelectDisplay from './Display'
import countries from './countries'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'CountrySelect',

  propTypes: {
    value: React.PropTypes.string,
    data: React.PropTypes.object,
    displayProperty: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string,
    maxResult: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      value: countries[0].value,
      data: countries[0],
      displayProperty: 'value',
      onChange: () => {},
      onSelection: () => {},
      onOpen: () => {},
      layout: 'full',
      spacing: 'loose',
      maxResults: 100
    }
  },

  componentDidMount () {
    this.props.onChange(this.props.value)
    this.props.onSelection(this.props.data)
  },

  render () {
    let classes = classnames([
      this.props.className,
      'hui-CountrySelect'
    ])

    return (
      <FilterSelect {...this.props}
        className={classes}
        label='Select your country'
        maxResult={this.props.maxResults}
        options={countries}
        Display={CountrySelectDisplay} />
    )
  }
})
