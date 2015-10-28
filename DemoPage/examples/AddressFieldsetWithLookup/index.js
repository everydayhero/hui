'use strict'

import React from 'react'
import AddressFieldsetWithLookup from '../../../forms/AddressFieldsetWithLookup'

export default React.createClass({
  displayName: 'AddressFieldsetWithLookupExample',

  getInitialState() {
    return { showErrors: false }
  },

  handleClick() {
    this.setState({ showErrors: !this.state.showErrors })
  },

  handleErrors(errors) {
    this.setState({ errors })
  },

  render() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="AddressFieldsetWithLookup">AddressFieldsetWithLookup</h3>

        <AddressFieldsetWithLookup
          countryCode="US"
          errorMessage="Please find your address, or enter manually"
          storeLocally={ true }
          showError={ this.state.showErrors }
          onError={ this.handleErrors }
          validations={{
            street_address: ['required'],
            extended_address: ['required'],
            locality: ['required'],
            region: ['required'],
            postal_code: ['required']
          }}
          prefix="address_with_lookup_" />

        <button onClick={ this.handleClick }>Show Errors</button>
      </div>
    )
  }
})
