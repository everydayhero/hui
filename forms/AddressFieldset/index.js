'use strict'

import React from 'react'
import find from 'lodash/find'
import merge from 'lodash/merge'
import isEqualWith from 'lodash/isEqualWith'
import classnames from 'classnames'
import formControl from '../../mixins/formControl'
import Input from '../TextInput'
import CountrySelect from '../CountrySelect'
import countries from '../CountrySelect/countries'
import i18n from './i18n'
import { translate } from '../../lib/i18n'

export default React.createClass({
  displayName: 'AddressFieldset',

  mixins: [formControl],

  propTypes: {
    header: React.PropTypes.element,
    address: React.PropTypes.object,
    prefix: React.PropTypes.string,
    spacing: React.PropTypes.string,
    internalSpacing: React.PropTypes.string,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    showError: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    onCountrySelect: React.PropTypes.func,
    validations: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      address: {
        paf_validated: false
      },
      autoFocus: false,
      showError: false,
      prefix: '',
      layout: 'full',
      spacing: 'loose',
      internalSpacing: 'tight',
      validations: {},
      onCountrySelect: () => {},
      onChange: () => {},
      onError: () => {},
      onBlur: null
    }
  },

  getInitialState () {
    let country = this.getSelectedCountry() || countries[0]
    let address = merge({}, this.props.address, { country })
    return {
      initialAddress: address,
      form: address,
      countryCode: country.value
    }
  },

  getSelectedCountry () {
    const countryName = this.props.address.country_name
    return find(countries, country => country.label === countryName || country.value === countryName)
  },

  fieldChangeHandler () {
    const pafValidated = isEqualWith(this.state.initialAddress, this.state.form, (i, f, k) => {
      if (k === 'paf_validated') { return i }
    })
    this.form = { ...this.state.form, paf_validated: pafValidated }
    this.setState({ form: this.form })
  },

  handleCountrySelection (country) {
    this.setState({ countryCode: country.value })
    this.onFieldChange('country')(country)
    this.onFieldChange('country_name')(country.label)
    this.props.onCountrySelect(country)
  },

  fieldProps (name) {
    const t = translate.bind(null, i18n, this.state.countryCode)

    let methods = this.props.validations[name]
    return {
      ...this.fieldMethods(name),
      ref: name,
      key: name,
      name: this.props.prefix + name,
      label: t(name),
      value: this.state.form[name],
      required: methods && !!methods.length,
      showError: this.props.showError,
      validate: methods,
      errorMessage: t(name + '_blank_error'),
      errors: this.state.errors && this.state.errors[name] && this.state.errors[name].messages,
      spacing: this.props.internalSpacing,
      storeLocally: this.props.storeLocally,
      localStorageKey: name
    }
  },

  renderAddressField (name, customProps) {
    return <Input {...this.fieldProps(name)} {...customProps} />
  },

  renderCountrySelect (name, customProps) {
    return <CountrySelect {...this.fieldProps(name)} {...customProps} />
  },

  render () {
    let props = this.props
    let state = this.state
    let classes = classnames([
      'hui-AddressFieldset',
      'hui-AddressFieldset--' + props.spacing,
      'hui-AddressFieldset--' + props.layout
    ])

    return (
      <div className={classes}>
        <div className={`hui-AddressFieldset__wrap hui-AddressFieldset__wrap--internal-${props.internalSpacing}`}>
          <div className='hui-AddressFieldset__header'>
            {props.header}
          </div>

          {this.renderAddressField('street_address', { autoFocus: !props.address.street_address && props.autoFocus })}
          {this.renderAddressField('extended_address')}
          {this.renderAddressField('locality', { layout: 'twoThirds' })}
          {this.renderAddressField('region', { layout: 'third' })}
          {this.renderCountrySelect('country_name', { data: state.form.country, displayProperty: 'label', layout: 'twoThirds', onSelection: this.handleCountrySelection })}
          {this.renderAddressField('postal_code', { layout: 'third' })}

          {props.children}

          <input type='hidden' name={props.prefix + 'country_iso'} value={state.countryCode} />
          <input type='hidden' name={props.prefix + 'paf_validated'} value={state.form.paf_validated} />
        </div>
      </div>
    )
  },

  statics: {
    i18n
  }
})
