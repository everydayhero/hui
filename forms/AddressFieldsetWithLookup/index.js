'use strict'

import React from 'react'
import Button from '../../buttons/Button'
import AddressLookup from '../AddressLookup'
import AddressFieldset from '../AddressFieldset'
import i18nMixin from '../../mixins/i18n'
import i18n from './i18n'

export default React.createClass({
  displayName: 'AddressFieldsetWithLookup',

  mixins: [i18nMixin],

  propTypes: {
    address: React.PropTypes.object,
    countryCode: React.PropTypes.string,
    prefix: React.PropTypes.string,
    onChange: React.PropTypes.func,
    validations: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      prefix: '',
      address: null,
      onChange: () => {}
    }
  },

  getInitialState () {
    return {
      address: this.props.address
    }
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
    this.setState({
      address
    }, () => {
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
        manualActions={ [this.renderManualButton()] }
        onChange={ this.handleLookupChange }
        address={ this.state.address } />
    )
  },

  renderFieldset () {
    let header = (<Button
      kind="secondary-borderless"
      icon="remove"
      iconLeft
      onClick={ this.clearAddress }>
      { this.t('reset') }
    </Button>)

    return (
      <AddressFieldset
        header={ header }
        prefix={ this.props.prefix }
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
