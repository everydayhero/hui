'use strict'

import React from 'react'
import AddressFieldsetWithLookup from '../../../forms/AddressFieldsetWithLookup'

export default React.createClass({
  displayName: 'AddressFieldsetWithLookupExample',

  render () {
    return (
      <div>
        <h3 className='DemoPage__h3' id='AddressFieldsetWithLookup'>AddressFieldsetWithLookup</h3>

        <AddressFieldsetWithLookup
          countryCode='US'
          errorMessage='Please find your address, or enter manually'
          storeLocally
          validations={{
            street_address: ['required'],
            locality: ['required'],
            region: ['required'],
            postal_code: ['required']
          }}
          prefix='address_with_lookup_' />
      </div>
    )
  }
})
