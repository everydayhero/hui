'use strict';

import AddressFieldset from '../'

describe('AddressFieldset', () => {
  describe('#handleChange()', () => {
    context('when any address value is set to something different than provided to props', () => {
      it('sets paf_validated to false', () => {
        let element = renderIntoDocument(
          <AddressFieldset address={{
            street_address: '123 Fakerton Drive',
            paf_validated: true
          }} />
        )
        element.handleChange('street_address')('124 Fakerton Avenue')
        let subject = element.state.address.paf_validated
        expect(subject).to.eq(false)
      })
    })

    context('when any address value is set back to what was provided to props', () => {
      it('sets paf_validated to the value provided to props', () => {
        let element = renderIntoDocument(
          <AddressFieldset address={{
            street_address: '123 Fakerton Drive',
            paf_validated: true
          }} />
        )
        element.handleChange('street_address')('124 Fakerton Avenue')
        element.handleChange('street_address')('123 Fakerton Drive')
        let subject = element.state.address.paf_validated
        expect(subject).to.eq(true)
      })
    })
  })
})
