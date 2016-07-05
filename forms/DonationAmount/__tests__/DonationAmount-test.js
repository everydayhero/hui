import { shallow } from 'enzyme'
import sinon from 'sinon'

import DonationAmount from '../'

describe('DonationAmount display component', () => {
  let wrapper, amount

  beforeEach(() => {
    amount = {
      cents: 5000,
      currency: {
        symbol: '$'
      }
    }
    wrapper = shallow(
      <DonationAmount amount={amount} />
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

  it('should set the text in the label to formatted currency', () => {
    const label = wrapper.find('label')
    expect(label).to.have.text('$50')
  })

  it('should set the text in the label to localised currency', () => {
    amount = {
      cents: 5000,
      currency: {
        symbol: '£'
      }
    }
    wrapper = shallow(<DonationAmount amount={amount} />)
    expect(wrapper.find('label')).to.have.text('£50')
  })

  it('should call onClicked when user clicks the label', () => {
    const clickStub = sinon.stub()
    wrapper = shallow(
      <DonationAmount
        amount={amount}
        onClicked={clickStub}
      />
    )
    const radio = wrapper.find('input[type="radio"]')
    radio.simulate('click')
    expect(clickStub).to.have.been.called
  })
})
