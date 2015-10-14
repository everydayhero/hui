'use strict'

import React from 'react'
import find from 'lodash/collection/find'
import Button from '../../buttons/Button'
import AddressLookup from '../AddressLookup'
import AddressFieldset from '../AddressFieldset'
import i18nMixin from '../../mixins/I18n'
import countries from '../CountrySelect/countries'
import i18n from './i18n'

export default React.createClass({
  displayName: 'AddressFieldsetWithLookup',

  mixins: [i18nMixin],

  propTypes: {
    spacing: React.PropTypes.string,
    address: React.PropTypes.object,
    countryCode: React.PropTypes.string,
    prefix: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    validations: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      spacing: 'loose',
      prefix: '',
      address: null,
      onChange: () => {},
      onError: () => {},
      validations: {}
    }
  },

  getInitialState () {
    return {
      countryCode: this.props.countryCode,
      address: this.props.address
    }
  },

  getCountryName(value) {
    return (find(countries, (country) => {
      return country.value === value
    }) || countries[0]).label
  },

  clearAddress () {
    this.setState({
      address: null
    })
  },

  setEmptyAddress () {
    let countryCode = this.refs.lookup.state.selectedCountry.value
    this.setState({
      countryCode,
      address: {
        country_name: this.getCountryName(countryCode),
        paf_validated: false
      }
    })
  },

  handleLookupChange (address) {
    let countryCode = this.refs.lookup.state.selectedCountry.value
    this.setState({
      countryCode,
      address
    }, () => {
      this.refs.fieldset.validate()
      this.props.onChange(address)
    })
  },

  handleFieldsetChange (address) {
    this.setState({
      address
    }, () => {
      this.props.onChange(address)
    })
  },

  isAnyFieldRequired () {
    return Object.keys(this.props.validations).some((key) => {
      return !!this.props.validations[key] &&
        this.props.validations[key].required
    })
  },

  renderManualButton: function() {
    return (
      <Button
        kind="secondary"
        className="hui-AddressFieldsetWithLookup__manual-entry"
        onClick={ this.setEmptyAddress }>
        { this.t('manual_entry_button') }
      </Button>
    )
  },

  renderLookup () {
    return (
      <AddressLookup
        ref="lookup"
        required={ this.isAnyFieldRequired() }
        errorMessage={ this.props.errorMessage }
        spacing={ this.props.spacing }
        countryCode={ this.props.countryCode }
        manualActions={ [this.renderManualButton()] }
        onError={ this.props.onError }
        onChange={ this.handleLookupChange }
        address={ this.state.address } />
    )
  },

  renderFieldset () {
    let header = (<Button
      className="hui-AddressFieldsetWithLookup__reset"
      kind="primary-borderless"
      icon="times"
      iconLeft
      onClick={ this.clearAddress }>
      { this.t('reset') }
    </Button>)

    return (
      <AddressFieldset
        ref="fieldset"
        spacing={ this.props.spacing }
        header={ header }
        prefix={ this.props.prefix }
        validations={ this.props.validations }
        onError={ this.props.onError }
        afterChange={ this.handleFieldsetChange }
        address={ this.state.address }/>
    )
  },

  render () {
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
