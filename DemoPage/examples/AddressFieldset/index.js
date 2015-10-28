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
    let address = this.state.address

    return (
      <div>
        <h3 className="DemoPage__h3" id="AddressFieldset">AddressFieldset</h3>

        <AddressFieldset
          storeLocally={ true }
          onChange={ this.handleChange }/>

        <p className="DemoPage__p">
          { address.street_address
            ? `${address.street_address}, ${address.extended_address}, ${address.locality}, ${address.region}, ${address.country_name}, ${address.postal_code}`
            : 'No address selected' }
        </p>
      </div>
    )
  }
})
