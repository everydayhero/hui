'use strict'

import React from 'react'
import { shallow, mount } from 'enzyme'
import DonationAmount from '../../DonationAmount'
import CustomDonationAmount from '../../CustomDonationAmount'
import DonationAmountsList from '../'

describe('DonationAmountsList display component', () => {
  let wrapper, donationAmounts

  beforeEach(() => {
    donationAmounts = [
      { amount: 25, isSelected: false },
      { amount: 50, isSelected: false }
    ]
    wrapper = shallow(
      <DonationAmountsList
        donationAmounts={donationAmounts}
      />
    )
  })

  it('should render a list of DonationAmount components', () => {
    expect(wrapper.find(DonationAmount)).to.not.have.length(0)
  })

  it('should render a DonationAmount for each value in the donation amount prop', () => {
    const donationElements = wrapper.find(DonationAmount)
    donationElements.forEach((option, index) => {
      expect(option.prop('amount')).to.equal(donationAmounts[index].amount)
    })
  })

  it('should render a CustomDonationAmount component', () => {
    expect(wrapper).to.have.descendants(CustomDonationAmount)
  })

  it('should pass onCustomAmountChange prop through to CustomDonationAmount', () => {
    const customAmountStub = sinon.stub()
    wrapper = shallow(
      <DonationAmountsList
        donationAmounts={donationAmounts}
        handleCustomAmountChanged={customAmountStub}
      />
    )
    const customComponent = wrapper.find(CustomDonationAmount).first()
    expect(customComponent).to.have.prop('handleChanged', customAmountStub)
  })

  it('should call handleSelected when a DonationAmount is selected', () => {
    const donationSelectedStub = sinon.stub()
    const realOptions = [
      {
        amount: 2500,
        isSelected: true
      },
      {
        amount: 5000,
        isSelected: false
      }
    ]
    const currency = {
      symbol: '$'
    }
    wrapper = mount(
      <DonationAmountsList
        donationAmounts={realOptions}
        currency={currency}
        handleDonationOptionSelected={donationSelectedStub}
      />
    )
    const firstDonation = wrapper.find(DonationAmount)
      .first().find('input[type="radio"]')
    const secondDonation = wrapper.find(DonationAmount)
      .at(1).find('input[type="radio"]')

    firstDonation.simulate('change')
    expect(donationSelectedStub).to.be.calledWith(0, {
      amount: 2500,
      isSelected: true
    })
    secondDonation.simulate('change')
    expect(donationSelectedStub).to.be.calledWith(1)
  })
})
