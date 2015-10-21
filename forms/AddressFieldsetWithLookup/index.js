'use strict'

import React from 'react'
import find from 'lodash/collection/find'
import includes from 'lodash/collection/includes'
import isEmpty from 'lodash/lang/isEmpty'
import Button from '../../buttons/Button'
import AddressLookup from '../AddressLookup'
import AddressFieldset from '../AddressFieldset'
import I18n from '../../mixins/I18n'
import countries from '../CountrySelect/countries'
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
    output: React.PropTypes.func,
    onError: React.PropTypes.func,
    showError: React.PropTypes.bool,
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
      countryCode: 'us',
      output: () => {},
      onError: () => {},
      validations: {}
    }
  },

  getInitialState() {
    return {
      countryCode: this.props.countryCode.toUpperCase(),
      address: this.props.prefill
    }
  },

  componentDidMount() {
    let props = this.props
    let errors = this.state.errors
    props.output(props.prefill)
    props.onError(includes(errors, true) || isEmpty(errors))
  },

  getCountryName(value) {
    return (find(countries, country => country.value === value) || countries[0]).label
  },

  clearAddress() {
    this.setState({ address: null })
  },

  setEmptyAddress() {
    this.setState({
      address: {
        country_name: this.getCountryName(this.state.countryCode),
        paf_validated: false
      }
    })
  },

  handleCountrySelect(countryCode) {
    this.setState({ countryCode })
  },

  handleAddressChange(address) {
    this.setState({ address }, () => this.props.output(address))
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
        manualAction={ this.renderManualButton() }
        onError={ this.props.onError }
        onCountrySelect={ this.handleCountrySelect }
        output={ this.handleAddressChange } />
    )
  },

  renderFieldset() {
    return (
      <AddressFieldset
        ref="fieldset"
        spacing={ this.props.spacing }
        header={ this.renderResetButton() }
        prefix={ this.props.prefix }
        validations={ this.props.validations }
        onError={ this.props.onError }
        onCountrySelect={ this.handleCountrySelect }
        afterChange={ this.handleAddressChange }
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
