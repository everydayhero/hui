import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import DonationProgressElement from '../../DonationProgressElement'
import DonationProgressBar from '../'

describe('Donation Progress Bar component', () => {
  let wrapper, totalAmount, existingAmount, influenceAmount

  beforeEach(() => {
    totalAmount = 70000
    existingAmount = 30000
    influenceAmount = 5000
    wrapper = shallow(
      <DonationProgressBar
        donationTarget={totalAmount}
        currentTotal={existingAmount}
        personalInfluence={influenceAmount}
      />
    )
  })

  it('should render a container element', () => {
    expect(wrapper).to.have.descendants('div.donation-progress.container')
  })

  it('should render a DonationProgressElement for the existing donations', () => {
    const progressElements = wrapper.find(DonationProgressElement)
    expect(progressElements).to.have.length(2)
    expect(progressElements.at(0)).to.have.className('existing')
  })

  it('should render a DonationProgressElement for the influence', () => {
    expect(wrapper.find(DonationProgressElement).at(1))
      .to.have.className('influence')
  })

  it('should pass the donationTarget cents onto both progress elements', () => {
    const progressElements = wrapper.find(DonationProgressElement)
    const existing = progressElements.at(0)
    const influence = progressElements.at(1)

    expect(existing).to.have.prop('totalAmount', totalAmount)
    expect(influence).to.have.prop('totalAmount', totalAmount)
  })

  it('should pass the currentTotal cents onto the existing progress element', () => {
    const existing = wrapper.find(DonationProgressElement).at(0)
    expect(existing).to.have.prop('elementAmount', existingAmount)
  })

  it('should pass the personalInfluence amount onto the influence element', () => {
    const influence = wrapper.find(DonationProgressElement).at(1)
    expect(influence).to.have.prop('elementAmount', influenceAmount)
  })
})
