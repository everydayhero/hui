'use strict'

import React from 'react'
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
      address: {
        paf_validated: false
      },
      onChange: () => {}
    }
  },

  getInitialState () {
    return {
      address: this.props.address
    }
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

  render () {
    return (
      <div>
        <AddressLookup
          onChange={ this.handleLookupChange }
          address={ this.state.address } />
        <AddressFieldset
          prefix={ this.props.prefix }
          afterChange={ this.handleFieldsetChange }
          address={ this.state.address }/>
      </div>
    )
  },

  statics: {
    i18n
  }
})
