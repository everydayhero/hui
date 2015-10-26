'use strict'

import React from 'react'
import find from 'lodash/collection/find'
import includes from 'lodash/collection/includes'
import isEmpty from 'lodash/lang/isEmpty'
import Button from '../../buttons/Button'
import AddressLookup from '../AddressLookup'
import AddressFieldset from '../AddressFieldset'
import countries from '../CountrySelect/countries'
import I18n from '../../mixins/I18n'
import i18n from './i18n'

export default React.createClass({
  displayName: 'AddressFieldsetWithLookup',

  mixins: [I18n],

  propTypes: {
    spacing: React.PropTypes.string,
    prefill: React.PropTypes.shape({
      street_address: React.PropTypes.string,
      extended_address: React.PropTypes.string,
      locality: React.PropTypes.string,
      region: React.PropTypes.string,
      country_name: React.PropTypes.string,
      postal_code: React.PropTypes.string
    }),
    countryCode: React.PropTypes.string,
    prefix: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    showError: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    validations: React.PropTypes.shape({
      street_address: React.PropTypes.array,
      extended_address: React.PropTypes.array,
      locality: React.PropTypes.array,
      region: React.PropTypes.array,
      country_name: React.PropTypes.array,
      postal_code: React.PropTypes.array
    })
  },

  getDefaultProps() {
    return {
      spacing: 'loose',
      prefix: '',
      prefill: null,
      showError: false,
      countryCode: 'au',
      onChange: () => {},
      onError: () => {},
      validations: {}
    }
  },

  getInitialState() {
    let countryCode = this.props.countryCode.toUpperCase()
    return {
      countryCode,
      country: find(countries, country => country.value === countryCode),
      address: this.props.prefill
    }
  },

  componentDidMount() {
    let props = this.props
    let errors = this.state.errors
    props.onChange(props.prefill)
    props.onError(includes(errors, true) || isEmpty(errors))
  },

  clearAddress() {
    this.setState({ address: null })
    this.props.onChange(null)
    this.props.onError(true)
  },

  setEmptyAddress() {
    this.setState({
      address: {
        street_address: this.state.queryString,
        country_name: this.state.country.label,
        paf_validated: false
      }
    })
  },

  handleError(err) {
    if (typeof err !== 'boolean') {
      this.setEmptyAddress()
    }
    this.props.onError(err)
  },

  handleCountrySelect(country) {
    this.setState({ country, countryCode: country.value })
  },

  handleAddressChange(address) {
    if (typeof address === 'string') {
      return this.setState({ queryString: address })
    }
    this.setState({ address }, () => this.props.onChange(address))
  },

  isAnyFieldRequired() {
    let validations = this.props.validations
    return Object.keys(validations)
            .some(key => !!validations[key] && validations[key].length)
  },

  renderManualButton() {
    return (
      <Button
        kind="secondary"
        className="hui-AddressFieldsetWithLookup__manual-entry"
        onClick={ this.setEmptyAddress }>
        { this.t('manual_entry_button') }
      </Button>
    )
  },

  renderResetButton() {
    return (
      <Button
        className="hui-AddressFieldsetWithLookup__reset"
        kind="primary-borderless"
        icon="times"
        iconLeft
        onClick={ this.clearAddress }>
        { this.t('reset') }
      </Button>
    )
  },

  renderLookup() {
    return (
      <AddressLookup
        ref="lookup"
        required={ this.isAnyFieldRequired() }
        errorMessage={ this.t('error_message') }
        spacing={ this.props.spacing }
        countryCode={ this.state.countryCode }
        selectedCountry={ this.state.country }
        manualAction={ this.renderManualButton() }
        onError={ this.handleError }
        onCountrySelect={ this.handleCountrySelect }
        onChange={ this.handleAddressChange } />
    )
  },

  renderFieldset() {
    return (
      <AddressFieldset
        ref="fieldset"
        spacing={ this.props.spacing }
        header={ this.renderResetButton() }
        prefix={ this.props.prefix }
        storeLocally={ this.props.storeLocally }
        autoFocus={ true }
        showError={ this.props.showError }
        validations={ this.props.validations }
        onError={ this.props.onError }
        onCountrySelect={ this.handleCountrySelect }
        onChange={ this.handleAddressChange }
        address={ this.state.address }/>
    )
  },

  render() {
    return (
      <div className="hui-AddressFieldsetWithLookup">
        { !this.state.address ? this.renderLookup() : this.renderFieldset() }
      </div>
    )
  },

  statics: {
    i18n
  }
})
