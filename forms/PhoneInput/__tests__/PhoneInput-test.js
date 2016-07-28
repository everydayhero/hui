'use strict'

import PhoneInput from '../'

describe('PhoneInput', () => {
  describe('initialisation', () => {
    it('sets dial code to the default country (Australia)', () => {
      const { value, dial_code } = renderIntoDocument(<PhoneInput />).state.selectedCountry
      value.should.eql('AU')
      dial_code.should.eql('+61')
    })

    it('sets dial code to a provided default country', () => {
      const { value, dial_code } = renderIntoDocument(<PhoneInput countryCode="uk" />).state.selectedCountry
      value.should.eql('UK')
      dial_code.should.eql('+44')
    })
  })

  it('allows country to be changed', (done) => {
    const subject = renderIntoDocument(<PhoneInput />)
    Simulate.click(findByClass(subject, 'hui-FilterSelect__display-input'))
    Simulate.mouseDown(scryByClass(subject, 'hui-OptionListItem__radio-label')[4])
    Simulate.blur(scryByClass(subject, 'hui-OptionListItem__radio--hidden')[4])

    setTimeout(() => {
      subject.state.isSelectingCountry.should.eq(false)
      subject.state.selectedCountry.value.should.eql('US')
      subject.state.selectedCountry.dial_code.should.eql('+1')
      done()
    }, 1)
  })
})
