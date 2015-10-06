'use strict'

import React from 'react'
import FilterSelect from '../FilterSelect'
import CountrySelectDisplay from './Display'
import countries from './countries'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'CountrySelect',

  propTypes: {
    displayProperty: React.PropTypes.string,
    selectedCountry: React.PropTypes.object,
    onSelection: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      value: 'AU',
      displayProp: 'label',
      onSelection: () => {},
      onOpen: () => {},
      layout: 'full',
      spacing: 'loose'
    }
  },

  render () {
    let classes = classnames([
      this.props.className,
      'hui-CountrySelect'
    ])

    return (
      <FilterSelect
        className={ classes }
        spacing={ this.props.spacing }
        layout={ this.props.layout }
        label="Select your country"
        options={ countries }
        value={ this.props.value }
        Display={ CountrySelectDisplay }
        onOpen={ this.props.onOpen }
        onSelection={ this.props.onSelection } />
    )
  }
})
