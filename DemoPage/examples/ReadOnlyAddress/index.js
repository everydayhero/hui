'use strict'

import React from 'react'
import ReadOnlyAddress from '../../../forms/ReadOnlyAddress'
import formMixin from '../../../mixins/reactForm.mixin'

export default React.createClass({
  displayName: 'ReadOnlyAddressExample',
  mixins: [formMixin],

  componentDidMount: function () {
    this.setState({
      form: {
        'charity_address': {
          'street_address': '333 Ann Street',
          'street_address_2': '',
          locality: 'Brisbane',
          region: 'QLD',
          'postal_code': '4116',
          'country_name': 'Australia'
        }
      }
    })
  },

  t: function (name) {
    var translation = {
      'charity_address_label': 'Charity Address:',
      'charity_address_hint': 'This is a read only field',
      'charity_address_tip': 'You can copy, but not edit this input.'
    }

    return (translation[name])
  },

  render: function () {
    var name = 'edh_address'
    var address = {
      'street_address': '333 Ann Street',
      'street_address_2': '',
      locality: 'Brisbane',
      region: 'QLD',
      'postal_code': '4116',
      'country_name': 'Australia'
    }

    return (
    <div>
      <h3 className='DemoPage__h3' id='ReadOnlyAddress'>ReadOnlyAddress</h3>
      <p className='DemoPage__p'>Read only address input (Contactinates address values with ",").</p>
      { this.readOnlyAddress('charity_address') }
      <ReadOnlyAddress id={name} value={address} />
    </div>
    )
  }
})
