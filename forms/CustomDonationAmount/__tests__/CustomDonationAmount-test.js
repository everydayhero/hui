'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import CustomDonationAmount from '../'

describe('CustomDonationAmount display component', () => {
  let wrapper, changeStub

  beforeEach(() => {
    changeStub = sinon.stub()
    wrapper = shallow(
      <CustomDonationAmount
        handleChanged={changeStub}
        amount={3500}
        currency={{ symbol: '$' }}
      />
    )
  })

  it('should render a defined_amount number input', () => {
    const numInput = wrapper.find('input[type="number"]')
    expect(numInput).to.be.present()
    expect(numInput).to.have.attr('name', 'defined_amount')
  })

  it('should render a matching label', () => {
    const label = wrapper.find('label')
    expect(label).to.be.present()
    expect(label).to.include.text('Other amount')
  })

  it('should render the customDonation cent value as a dollar value', () => {
    const numInput = wrapper.find('input[type="number"]')
    expect(numInput).to.have.value('35')
  })

  it('should render no value if the customDonation cent value is 0', () => {
    wrapper = shallow(<CustomDonationAmount />)
    const numInput = wrapper.find('input[type="number"]')
    expect(numInput).to.have.value('')
  })

  describe('change listener', () => {
    beforeEach(() => {
      const numInput = wrapper.find('input[type="number"]')
      numInput.simulate('change', { target: { value: '35' }})
    })

    it('should call handleChanged prop when input value changes', () => {
      expect(changeStub).to.be.called
    })

    it('should call handleChanged with the dollar value converted to cents', () => {
      expect(changeStub).to.be.calledWith(3500)
    })
  })
})
