import React from 'react'
import { shallow } from 'enzyme'

import DonationProgressElement from '../'

describe('DonationProgressElement display component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <DonationProgressElement
        className='donation-progress existing'
        totalAmount={70000}
        elementAmount={30000}
      />
    )
  })

  it('should render as a div with the passed-in className prop', () => {
    expect(wrapper).to.have.descendants('div.donation-progress.existing')
  })

  it('should have a percentage width in ratio to the total / element cents', () => {
    const ratio = 30000 / 70000 
    const styleValue = `${ratio * 100}%`

    expect(wrapper.find('.donation-progress')).to.have.style('width', styleValue)
  })
})
