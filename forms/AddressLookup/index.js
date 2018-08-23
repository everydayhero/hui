'use strict'

import React from 'react'
import forEach from 'lodash/forEach'
import classnames from 'classnames'
import UrlSearchSelect from '../UrlSearchSelect'
import CountrySelect from '../CountrySelect'
import countries from '../CountrySelect/countries'
import getJSON from '../../lib/getJSON'
import apiRoutes from '../../api'
import { translate } from '../../lib/i18n'
import i18n from './i18n'

const addressesSearchUrl = apiRoutes('addresses_search')
const addressUrl = apiRoutes('address')

export default React.createClass({
  displayName: 'AddressLookup',

  propTypes: {
    layout: React.PropTypes.string,
    required: React.PropTypes.bool,
    errors: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    showError: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    countryCode: React.PropTypes.string,
    selectedCountry: React.PropTypes.object,
    onError: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onCountrySelect: React.PropTypes.func,
    manualAction: React.PropTypes.node,
    address: React.PropTypes.shape({
      street_address: React.PropTypes.string,
      extended_address: React.PropTypes.string,
      locality: React.PropTypes.string,
      region: React.PropTypes.string,
      country_name: React.PropTypes.string,
      postal_code: React.PropTypes.string
    })
  },

  getDefaultProps () {
    return {
      countryCode: countries[0].value,
      selectedCountry: countries[0],
      showError: false,
      onCountrySelect: () => {},
      onChange: () => {},
      onError: () => {},
      layout: 'full',
      spacing: 'loose',
      manualAction: null
    }
  },

  getInitialState () {
    return {
      selectedCountry: this.props.selectedCountry,
      minQueryLength: 5,
      pendingRequest: null,
      address: null
    }
  },

  deserializeAddressesResponse (response) {
    if (!response || !response.addresses) { return [] }
    return response.addresses.map((address) => {
      return {
        value: address.id,
        label: address.label
      }
    })
  },

  isPAFLookup () {
    return ((!!this.state.selectedCountry &&
        this.state.selectedCountry.value) === 'UK')
  },

  isGoogleLookup () {
    return !this.isPAFLookup()
  },

  removeNull (o) {
    return forEach(o, (d, k) => { o[k] = d === null ? '' : d })
  },

  fetchAddress (id) {
    return getJSON(`${addressUrl}/${this.state.selectedCountry.value}/${id}`)
      .then(response => {
        let address = this.removeNull(response.address)
        if (this.isPAFLookup()) {
          address.paf_validated = true
        }
        this.setState({
          pendingRequest: null,
          address
        }, () => {
          this.props.onChange(address)
        })
      })
      .catch(this.props.onError)
  },

  handleAddressSelection (address) {
    if (this.state.pendingRequest) {
      this.state.pendingRequest.cancel()
    }
    this.setState({
      pendingRequest: this.fetchAddress(address.value)
    })
  },

  handleCountrySelection (country) {
    this.setState({
      isSelectingCountry: false,
      selectedCountry: country
    }, () => this.props.onCountrySelect(country))
  },

  handleCountrySelectOpen () {
    this.setState({
      isSelectingCountry: true
    })
  },

  handleCountrySelectBlur () {
    this.setState({
      isSelectingCountry: false
    })
  },

  render () {
    let props = this.props
    let state = this.state
    let classes = classnames([
      props.className,
      'hui-AddressLookup--' + props.layout,
      'hui-AddressLookup--' + props.spacing,
      'hui-AddressLookup'
    ])
    let urlSearchSelectClasses = classnames({
      'hui-AddressLookup_url-search-select': true,
      'hui-AddressLookup_url-search-select--google': this.isGoogleLookup(),
      'hui-AddressLookup_url-search-select--inactive': state.isSelectingCountry
    })
    let countrySelectClasses = classnames({
      'hui-AddressLookup__country-select': true,
      'hui-AddressLookup__country-select--active': state.isSelectingCountry
    })

    const t = translate.bind(null, i18n, state.selectedCountry.value)

    return (
      <div className={classes}>
        <UrlSearchSelect
          ref='searchSelect'
          label={t('search_prompt')}
          className={urlSearchSelectClasses}
          url={addressesSearchUrl}
          params={{ country_code: state.selectedCountry.value }}
          spacing='compact'
          pendingRequest={!!state.pendingRequest}
          required={props.required}
          errorMessage={props.errorMessage}
          errors={props.errors}
          emptyLabel={props.emptyLabel || t('empty_label')}
          manualAction={props.manualAction}
          minQueryLength={state.minQueryLength}
          deserializeResponse={this.deserializeAddressesResponse}
          showError={props.showError}
          onError={props.onError}
          onChange={props.onChange}
          onSelection={this.handleAddressSelection} />
        <CountrySelect
          ref='countrySelect'
          spacing='compact'
          displayProperty='value'
          className={countrySelectClasses}
          value={state.selectedCountry.value}
          data={state.selectedCountry}
          onBlur={this.handleCountrySelectBlur}
          onOpen={this.handleCountrySelectOpen}
          onSelection={this.handleCountrySelection} />
      </div>
    )
  },

  statics: {
    i18n
  }
})
