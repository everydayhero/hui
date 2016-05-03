'use strict'

import React from 'react'
import Input from '../Input'
import validateAs from '../../lib/validation'
import cx from 'classnames'

export default React.createClass({
  displayName: 'PhoneInput',

  getInitialState() {
    return {
      isSelectingCountry: false,
      country: null
    }
  },

  handleCountrySelection(country) {
    this.setState({
      isSelectingCountry: false,
      selectedCountry: country
    })
  },

  handleCountrySelectOpen() {
    this.setState({
      isSelectingCountry: true
    })
  },

  handleCountrySelectBlur() {
    this.setState({
      isSelectingCountry: false
    })
  },

  render() {
    const { props, state } = this
    const { isSelectingCountry, selectedCountry } = state
    const countrySelectClasses = cx({
      'hui-AddressLookup__country-select': true,
      'hui-AddressLookup__country-select--active': isSelectingCountry
    })
    return (
      <div className={ this.constructor.displayName }>
        <CountrySelect
          ref="countrySelect"
          spacing="compact"
          displayProperty="idd"
          className={ countrySelectClasses }
          value={ selectedCountry.value }
          data={ selectedCountry }
          onBlur={ this.handleCountrySelectBlur }
          onOpen={ this.handleCountrySelectOpen }
          onSelection={ this.handleCountrySelection } />
        <Input { ...props } validate={ validateAs.phone } />
        <input type="hidden" name={ props.name } value={ selectedCountry.idd + props.value } />
      </div>
    )
  }
})
