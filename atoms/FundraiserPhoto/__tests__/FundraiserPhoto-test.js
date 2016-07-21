import React from 'react'
import { shallow } from 'enzyme'

import FundraiserPhoto from '../'

describe('FundraiserPhoto component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<FundraiserPhoto href={'testraiser.jpg'} />)
  })

  it('should render an img', () => {
    expect(wrapper).to.have.descendants('img')
  })

  it('should pass the href prop onto the img', () => {
    expect(wrapper.find('img')).to.have.prop('href', 'testraiser.jpg')
  })

  it('should wrap the image in a border container', () => {
    const borderElement = wrapper.find('img').parent()
    expect(borderElement).to.have.className('fundraiser-photo')
  })

  it('should set a circle-image class on the image', () => { 
    expect(wrapper.find('img')).to.have.className('circle-border')
  })
})
