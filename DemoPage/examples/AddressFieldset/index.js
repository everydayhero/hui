'use strict'

import React from 'react'
import AddressFieldset from '../../../forms/AddressFieldset'

export default React.createClass({
  displayName: 'AddressFieldsetExample',

  getInitialState () {
    return {
      address: {
        street_address: '',
        extended_address: '',
        locality: '',
        region: '',
        country_name: '',
        postal_code: '',
      }
    }
  },

  handleChange (address) {
    this.setState({
      address
    })
  },

  render: function() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="AddressFieldset">AddressFieldset</h3>

        <AddressFieldset
          afterChange={ this.handleChange }/>

        <p className="DemoPage__p">
          { this.state.address.street_address || 'No address selected' }
        </p>
      </div>
    )
  }
})
