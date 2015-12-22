'use strict'

import AddressLookup from '../'

describe('AddressLookup', () => {
  describe('initialisation', () => {
    it('sets state.selectedCountry to the first country in countries', () => {
      const subject = renderIntoDocument(
        <AddressLookup />
      ).state.selectedCountry.value

      expect(subject).to.eql('AU')
    })
  })

  describe('a blur event from the CountrySelect', () => {
    it('sets state.isSelectingCountry to false', (done) => {
      const element = renderIntoDocument(
        <AddressLookup />
      )
      element.setState({ isSelectingCountry: true })
      const countrySelect = element.refs.countrySelect.getDOMNode()

      Simulate.blur(countrySelect)

      setTimeout(() => {
        const subject = element.state.isSelectingCountry
        expect(subject).to.eq(false)
        done()
      }, 100)
    })
  })
})
