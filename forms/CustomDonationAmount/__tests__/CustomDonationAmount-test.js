'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import CustomDonationAmount from '../'

describe('CustomDonationAmount display component', () => {
  let wrapper, changeStub

  beforeEach(() => {
    changeStub = sinon.stub()
    wrapper = shallow(<CustomDonationAmount handleChanged={changeStub } />)
  })

  it('should render a defined_amount number input', () => {
    const numInput = wrapper.find('input[type="number"]')
    expect(numInput).to.be.present()
    expect(numInput).to.have.attr('name', 'defined_amount')
  })

  it('should render a matching label', () => {
    const label = wrapper.find('label')
    expect(label).to.be.present()
    expect(label).to.have.text('Other amount')
  })

  it('should call handleChanged prop when input value changes', () => {
    const numInput = wrapper.find('input[type="number"]')
    numInput.simulate('change', { target: { value: '35' }})
    expect(changeStub).to.be.calledWith('35')
  })
})
