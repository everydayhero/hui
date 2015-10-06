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

  renderLookup () {
    return (
      <AddressLookup
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
      <div>
        { !this.state.address ? this.renderLookup() : this.renderFieldset() }
      </div>
    )
  },

  statics: {
    i18n
  }
})
