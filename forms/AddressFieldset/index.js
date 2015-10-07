'use strict'

import React from 'react'
import find from 'lodash/collection/find'
import classnames from 'classnames'
import i18nMixin from '../../mixins/I18n'
import Input from '../TextInput'
import CountrySelect from '../CountrySelect'
import countries from '../CountrySelect/countries'
import i18n from './i18n'

export default React.createClass({
  displayName: 'AddressFieldset',

  mixins: [i18nMixin],

  propTypes: {
    header: React.PropTypes.element,
    address: React.PropTypes.object,
    prefix: React.PropTypes.string,
    spacing: React.PropTypes.string,
    internalSpacing: React.PropTypes.string,
    onChange: React.PropTypes.func,
    afterChange: React.PropTypes.func,
    validations: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      address: {
        paf_validated: false
      },
      autoFocus: false,
      prefix: '',
      required: false,
      layout: 'full',
      spacing: 'loose',
      internalSpacing: 'tight',
      onChange: () => {},
      afterChange: () => {},
      validate: () => {}
    }
  },

  getInitialState () {
    return {
      address: this.props.address,
      countryCode: (this.getSelectedCountry() || countries[0]).value
    }
  },

  getSelectedCountry () {
    return find(countries, (country) => {
      return country.label === this.props.address.country_name
    })
  },

  getPAFValidated (oldValue, newValue) {
    var pafValidated = this.props.address.paf_validated
    return (oldValue === newValue) ? pafValidated : false
  },

  handleChange (property) {
    return (value) => {
      this.setState({
        address: {
          ...this.state.address,
          paf_validated: this.getPAFValidated(this.props.address[property], value),
          [property]: value
        }
      }, () => {
        this.props.onChange(`${this.props.prefix}${property}`, value)
        this.props.afterChange(this.state.address)
      })
    }
  },

  handleCountrySelection (country) {
    this.setState({
      countryCode: country.value
    }, () => {
      this.handleChange('country_name')(country.label)
    })
  },

  render () {
    let classes = classnames([
      'hui-AddressFieldset',
      'hui-AddressFieldset--' + this.props.spacing,
      'hui-AddressFieldset--' + this.props.layout
    ])

    return (
      <div className={ classes }>
        <div className={ `hui-AddressFieldset__wrap hui-AddressFieldset__wrap--internal-${this.props.internalSpacing }` }>
          <div className="hui-AddressFieldset__header">
            { this.props.header }
          </div>
          <Input
            autoFocus={ this.props.autoFocus }
            ref="street_address"
            key="street_address"
            name={ this.props.prefix + 'street_address' }
            label={ this.t('street_address', { scope: this.state.countryCode }) }
            value={ this.state.address.street_address }
            spacing={ this.props.internalSpacing }
            onChange={ this.handleChange('street_address') } />
          <Input
            key="extended_address"
            ref="extended_address"
            name={ this.props.prefix + 'extended_address' }
            label={ this.t('extended_address', { scope: this.state.countryCode }) }
            value={ this.state.address.extended_address }
            spacing={ this.props.internalSpacing }
            onChange={ this.handleChange('extended_address') } />
          <Input
            key="locality"
            ref="locality"
            name={ this.props.prefix + 'locality' }
            label={ this.t('locality', { scope: this.state.countryCode }) }
            value={ this.state.address.locality }
            layout="twoThirds"
            spacing={ this.props.internalSpacing }
            onChange={ this.handleChange('locality') } />
          <Input
            key="region"
            ref="region"
            name={ this.props.prefix + 'region' }
            label={ this.t('region', { scope: this.state.countryCode }) }
            value={ this.state.address.region }
            layout="third"
            spacing={ this.props.internalSpacing }
            onChange={ this.handleChange('region') } />
          <CountrySelect
            key="country_name"
            ref="country_name"
            name={ this.props.prefix + 'country_name' }
            label={ this.t('country_name', { scope: this.state.countryCode }) }
            layout="twoThirds"
            spacing={ this.props.internalSpacing }
            value={ this.state.countryCode }
            onSelection={ this.handleCountrySelection } />
          <Input
            key="postal_code"
            ref="postal_code"
            name={ this.props.prefix + 'postal_code' }
            label={ this.t('postal_code', { scope: this.state.countryCode }) }
            value={ this.state.address.postal_code }
            layout="third"
            spacing={ this.props.internalSpacing }
            onChange={ this.handleChange('postal_code') } />
          { this.props.children }
          <input type="hidden" name={ this.props.prefix + 'country_iso' } value={ this.state.countryCode } />
          <input type="hidden" name={ this.props.prefix + 'paf_validated' } value={ this.state.address.paf_validated } />
        </div>
      </div>
    )
  },

  statics: {
    i18n
  }
})
