import { shallow } from 'enzyme'
import sinon from 'sinon'

import DonationAmount from '../'

describe('DonationAmount display component', () => {
  let wrapper, amount, currency

  beforeEach(() => {
    amount = 5000
    currency = {
      symbol: '$'
    }
    wrapper = shallow(
      <DonationAmount
        amount={amount}
        currency={currency}
        selected={true}
      />
    )
  })

  it('should render a predefined_amount radio input', () => {
    expect(wrapper.find('input[type="radio"]')).to.be.present()
  })

  it('should render a label for the input', () => {
    expect(wrapper.find('label')).to.be.present()
  })
  
  it('should set the value of the radio to the amount prop', () => {
    const radio = wrapper.find('input[type="radio"]')
    expect(radio).to.have.value('5000')
  })

  it('should set the checked attribute to the selected prop', () => {
    const radio = wrapper.find('input[type="radio"]')
    expect(radio).to.have.prop('checked', true)
  })

  it('should set the text in the label to formatted currency', () => {
    const label = wrapper.find('label')
    expect(label).to.have.text('$50')
  })

  it('should set the text in the label to localised currency', () => {
    amount = 5000
    currency = {
      symbol: '£'
    }
    wrapper = shallow(
      <DonationAmount
        amount={amount}
        currency={currency}
      />)
    expect(wrapper.find('label')).to.have.text('£50')
  })

  it('should call handleSelected when user clicks the label', () => {
    const clickStub = sinon.stub()
    wrapper = shallow(
      <DonationAmount
        amount={amount}
        currency={currency}
        checked={false}
        handleSelected={clickStub}
      />
    )
    const radio = wrapper.find('input[type="radio"]')
    radio.simulate('change')
    expect(clickStub).to.have.been.called
  })
})
