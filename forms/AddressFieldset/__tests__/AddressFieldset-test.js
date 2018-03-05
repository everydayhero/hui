'use strict'

import { mount } from 'enzyme'
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
  it('renders text labels for each field', () => {
    const wrapper = mount(<AddressFieldset />)
    const labels = wrapper.find('.hui-TextInput__label')

    expect(labels.at(0).text()).to.equal('Address')
    expect(labels.at(1).text()).to.equal('Address 2')
    expect(labels.at(2).text()).to.equal('Suburb')
    expect(labels.at(3).text()).to.equal('State')
    expect(labels.at(4).text()).to.equal('Postcode')
  })

  it('renders regionalised input labels when the region is changed', () => {
    const wrapper = mount(<AddressFieldset />)
    const labels = wrapper.find('.hui-TextInput__label')

    expect(labels.at(0).text()).to.equal('Address')
    expect(labels.at(1).text()).to.equal('Address 2')
    expect(labels.at(2).text()).to.equal('Suburb')
    expect(labels.at(3).text()).to.equal('State')
    expect(labels.at(4).text()).to.equal('Postcode')

    wrapper.setState({ countryCode: 'us' })

    expect(labels.at(0).text()).to.equal('Address')
    expect(labels.at(1).text()).to.equal('Address 2')
    expect(labels.at(2).text()).to.equal('City')
    expect(labels.at(3).text()).to.equal('State')
    expect(labels.at(4).text()).to.equal('ZIP')
  })

  describe('#onFieldChange()', () => {
    context('when any address value is set to something different than provided to props', () => {
      it('sets paf_validated to false', () => {
        let element = renderIntoDocument(
          <AddressFieldset address={fakeAddress} />
        )
        element.onFieldChange('street_address')('124 Fakerton Avenue')
        expect(element.state.form.paf_validated).to.eq(false)
      })
    })

    context('when any address value is set back to what was provided to props', () => {
      it('sets paf_validated to the value provided to props', () => {
        let element = renderIntoDocument(
          <AddressFieldset address={fakeAddress} />
        )
        element.onFieldChange('street_address')('124 Fakerton Avenue')
        element.onFieldChange('street_address')(fakeAddress.street_address)
        expect(element.state.form.paf_validated).to.eq(true)
      })
    })
  })

  it('calls an onBlur callback when a given field is blurred', () => {
    const onBlurSpy = sinon.spy()
    const wrapper = mount(
      <AddressFieldset
        address={fakeAddress}
        onBlur={onBlurSpy} />
    )
    const streetInput = wrapper.find('#street_address')
    streetInput.simulate('blur')

    expect(onBlurSpy).to.have.been.calledOnce
    expect(onBlurSpy).to.have.been.calledWith('street_address', '123 Fakerton Drive')
  })

  it('validates fields on mount using the supplied hash of validations', () => {
    const validationSpy = sinon.spy(() => ({
      valid: true
    }))
    const validations = {
      street_address: [validationSpy],
      extended_address: [validationSpy],
      locality: [validationSpy],
      region: [validationSpy],
      country_name: [validationSpy],
      postal_code: [validationSpy]
    }
    mount(
      <AddressFieldset
        address={fakeAddress}
        validations={validations}
      />
    )
    // TODO: 10 times ... really? There are 6 fields there ... and ... why?
    // Our validation stuff is a bit knotty.
    expect(validationSpy.callCount).to.equal(10)
  })
})
