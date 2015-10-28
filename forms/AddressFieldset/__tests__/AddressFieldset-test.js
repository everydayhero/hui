'use strict';

import AddressFieldset from '../'
let fakeAddress = {
  street_address: '123 Fakerton Drive',
  extended_address: '',
  paf_validated: true,
  country_name: 'Australia',
  locality: '',
  region: '',
  postal_code: ''
}

describe('AddressFieldset', () => {
  describe('#onFieldChange()', () => {
    context('when any address value is set to something different than provided to props', () => {
      it('sets paf_validated to false', () => {
        let element = renderIntoDocument(
          <AddressFieldset address={ fakeAddress } />
        )
        element.onFieldChange('street_address')('124 Fakerton Avenue')
        expect(element.state.form.paf_validated).to.eq(false)
      })
    })

    context('when any address value is set back to what was provided to props', () => {
      it('sets paf_validated to the value provided to props', () => {
        let element = renderIntoDocument(
          <AddressFieldset address={ fakeAddress } />
        )
        element.onFieldChange('street_address')('124 Fakerton Avenue')
        element.onFieldChange('street_address')(fakeAddress.street_address)
        expect(element.state.form.paf_validated).to.eq(true)
      })
    })
  })
})
