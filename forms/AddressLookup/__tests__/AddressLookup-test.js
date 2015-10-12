'use strict';

import AddressLookup from '../'

describe('AddressLookup', () => {
  describe('initialisation', () => {
    it('sets state.selectedCountry to the first country in countries', () => {
      let subject = renderIntoDocument(
        <AddressLookup />
      ).state.selectedCountry.value

      expect(subject).to.eql('AU')
    })
  })
})
