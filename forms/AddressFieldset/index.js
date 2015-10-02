'use strict'

import React from 'react'
import find from 'lodash/collection/find'
import classnames from 'classnames'
import i18nMixin from '../../mixins/i18n'
import Input from '../TextInput'
import CountrySelect from '../CountrySelect'
import countries from '../CountrySelect/countries'
import i18n from './i18n'

export default React.createClass({
  displayName: 'AddressFieldset',

  mixins: [i18nMixin],

  propTypes: {
    address: React.PropTypes.object,
    countryCode: React.PropTypes.string,
    prefix: React.PropTypes.string,
    spacing: React.PropTypes.string,
    internalSpacing: React.PropTypes.string,
    onChange: React.PropTypes.func,
    validations: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      address: {
        paf_validated: false
      },
      countryCode: 'AU',
      autoFocus: false,
      prefix: '',
      required: false,
      layout: 'full',
      spacing: 'loose',
      internalSpacing: 'tight',
      onChange: () => {},
      validate: () => {}
    }
  },

  getInitialState () {
    return {
      address: this.props.address,
      countryCode: this.props.countryCode
    }
  },

  componentWillReceiveProps (nextProps) {
    let newCountry = find(countries, (country) => {
      return country.label === (nextProps.address && nextProps.address.country_name)
    })

    this.setState({
      address: nextProps.address,
      countryCode: newCountry && newCountry.value
    })
  },

  getPAFValidated (oldValue, newValue) {
    var pafValidated = this.state.address.paf_validated
    return (oldValue === newValue) ? pafValidated : false
  },

  handleChange (property) {
    return (value) => {

      this.setState({
        address: {
          ...this.state.address,
          paf_validated: getPAFValidated(this.state.address[property], value),
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
      countryCode: country.value,
      address: {
        ...this.state.address,
        paf_validated: getPAFValidated(this.state.countryCode, country.value),
        country_name: country.label
      }
    }, () => {
      this.props.onChange(`${this.props.prefix}country_name`, country.value)
      this.props.afterChange(this.state.address)
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
        <Input
          autoFocus={ this.props.autoFocus }
          ref="street_address"
          key="street_address"
          name={ this.props.prefix + 'street_address' }
          label={ this.t('street_address', { scope: this.state.countryCode }) }
          value={ this.state.address.street_address }
          showIcon={ false }
          spacing={ this.props.internalSpacing }
          onChange={ this.handleChange('street_address') } />
        <Input
          key="extended_address"
          ref="extended_address"
          name={ this.props.prefix + 'extended_address' }
          label={ this.t('extended_address', { scope: this.state.countryCode }) }
          value={ this.state.address.extended_address }
          showIcon={ false }
          spacing={ this.props.internalSpacing }
          onChange={ this.handleChange('extended_address') } />
        <Input
          key="locality"
          ref="locality"
          name={ this.props.prefix + 'locality' }
          label={ this.t('locality', { scope: this.state.countryCode }) }
          value={ this.state.address.locality }
          layout="twoThirds"
          showIcon={ false }
          spacing={ this.props.internalSpacing }
          onChange={ this.handleChange('locality') } />
        <Input
          key="region"
          ref="region"
          name={ this.props.prefix + 'region' }
          label={ this.t('region', { scope: this.state.countryCode }) }
          value={ this.state.address.region }
          layout="third"
          showIcon={ false }
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
          showIcon={ false }
          spacing={ this.props.internalSpacing }
          onChange={ this.handleChange('postal_code') } />
        { this.props.children }
        <input type="hidden" name={ this.props.prefix + 'country_iso' } value={ this.state.countryCode } />
        <input type="hidden" name={ this.props.prefix + 'paf_validated' } value={ this.state.address.paf_validated } />
      </div>
    )
  },

  statics: {
    i18n
  }
})
