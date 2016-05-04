'use strict'

import React from 'react'
import TextInput from '../TextInput'
import CountrySelect from '../CountrySelect'
import countries from '../CountrySelect/countries'
import validateAs from '../../lib/validation'
import cx from 'classnames'
import find from 'lodash/collection/find'
import reduce from 'lodash/collection/reduce'

export default React.createClass({
  displayName: 'PhoneInput',

  propTypes: {
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string,
    countryCode: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      layout: 'full',
      spacing: 'loose',
      countryCode: 'au'
    }
  },

  getInitialState() {
    return {
      isSelectingCountry: false,
      selectedCountry: find(countries, (d) => d.value === this.props.countryCode.toUpperCase())
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
    const { displayName, formatPhone } = this.constructor
    const { props, state } = this
    const { isSelectingCountry, selectedCountry } = state
    const className = 'hui-' + displayName
    const classes = cx([
      className,
      className + '--' + props.layout,
      className + '--' + props.spacing
    ])
    const textInputClasses = cx({
      [className + '_TextInput']: true,
      [className + '_TextInput--inactive']: isSelectingCountry,
      [className + '_TextInput--extraPadding']: selectedCountry.dial_code.length > 3
    })
    const countrySelectClasses = cx({
      [className + '_CountrySelect']: true,
      [className + '_CountrySelect--active']: isSelectingCountry
    })
    return (
      <div className={ classes }>
        <TextInput { ...props } className={ textInputClasses } spacing="compact" validate={ validateAs.phone } />
        <CountrySelect
          ref="countrySelect"
          spacing="compact"
          displayProperty="dial_code"
          className={ countrySelectClasses }
          value={ selectedCountry.value }
          data={ selectedCountry }
          onBlur={ this.handleCountrySelectBlur }
          onOpen={ this.handleCountrySelectOpen }
          onSelection={ this.handleCountrySelection } />
        <input type="hidden" name={ props.name } value={ formatPhone(selectedCountry.dial_code + props.value) } />
      </div>
    )
  },

  statics: {
    formatPhone(num) {
      let extAdded = false
      return reduce(num, (res, d) => {
        let n = ''
        if (isNaN(d) && d !== '+') {
          if (!extAdded && d.toLowerCase() === 'x') {
            extAdded = true
            n = ' ext. '
          }
        } else if (d !== ' ') {
          n = d
        }
        return res + n
      })
    }
  }
})
