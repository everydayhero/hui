'use strict'

import Input from '../'
import moment from 'moment'

describe('DatePicker', function () {
  describe('defaults', function () {
    var element, input

    beforeEach(function () {
      element = renderIntoDocument(<Input />)
      input = findByClass(element, 'hui-TextInput__input')
    })

    it('no value', function () {
      input.value.should.equal('')
    })

    it('no id', function () {
      input.id.should.equal('')
    })

    it('no name', function () {
      input.name.should.equal('')
    })
  })

  describe('properties', function () {
    var element, input

    beforeEach(function () {
      element = renderIntoDocument(<Input value='2015-12-09' id='seven' />)
      input = findByClass(element, 'hui-TextInput__input')
    })

    it('value of 09/12/2015', function () {
      input.value.should.equal('09/12/2015')
    })

    describe('Passed an id of seven', function () {
      it('id is seven', function () {
        input.id.should.equal('seven')
      })
    })
  })

  describe('onChange', function () {
    it('is fired onChange', function () {
      var parsedValue
      var initialValue = '2015-12-09'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(
        <Input onChange={listener} />
      )
      element.onDateChange(moment(initialValue))

      parsedValue.should.equal(initialValue)
    })

    it('changes to new value if it was prefilled', function () {
      var initialValue = '2015-07-11'
      var today = moment().format('YYYY-MM-DD')
      var currentValue
      var element = TestUtils.renderIntoDocument(
        <Input
          value={initialValue}
          onChange={function (value) { currentValue = value }} />
      )

      var input = findByClass(element, 'hui-TextInput__input')
      TestUtils.Simulate.focus(input)

      var day = findByClass(element, 'hui-DatePickerDay--today')
      TestUtils.Simulate.click(day)

      expect(today).to.equal(currentValue)
    })
  })

  describe('toggle datepicker', function () {
    it('shows/hides onClick', function () {
      var element = renderIntoDocument(<Input />)
      var input = findByClass(element, 'hui-TextInput__input')

      Simulate.focus(input)

      element.state.open.should.equal(true)

      element._clickBody({ target: 'foo' })

      element.state.open.should.equal(false)
    })
  })

  describe('clear field', function () {
    it('clears field on click clear field', function () {
      var parsedValue = 'foo'
      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input value='2015-12-09' onChange={listener} />)

      var clear = findByClass(element, 'hui-Icon')
      element.close()
      Simulate.mouseDown(clear)

      expect(parsedValue).to.equal(null)
    })
  })

  describe('formats', function () {
    it('allow optional display formats', function () {
      var element = renderIntoDocument(<Input value='2015-12-09' displayFormat='MM/DD/YYYY' />)
      var input = findByTag(element, 'input')

      input.value.should.equal('12/09/2015')
    })

    it('allow optional value formats', function () {
      var element = renderIntoDocument(<Input value='2010-10-20 4:30 +0000' valueFormat='YYYY-MM-DD HH:mm Z' />)
      var input = findByTag(element, 'input')

      input.value.should.equal('20/10/2010')
    })

    it('outputs optional value formats', function () {
      var listener = sinon.spy()
      var element = renderIntoDocument(<Input
        valueFormat='YYYY-MM-DD HH:mm Z'
        onChange={listener} />)
      element.onDateChange(moment('2015-12-09'))

      listener.should.have.been.called
    })
  })

  describe('type in date format', function () {
    it('allows typed in date with format DD/MM/YYYY', function () {
      var parsedValue
      var initialValue = '12/09/1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format DD/MM/YY', function () {
      var parsedValue
      var initialValue = '12/09/79'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format MMM DD YY', function () {
      var parsedValue
      var initialValue = 'Sep 12 1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format DD MMM YY', function () {
      var parsedValue
      var initialValue = '12 Sep 1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format Do MMM YY', function () {
      var parsedValue
      var initialValue = '12th September 1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format MMM Do YY', function () {
      var parsedValue
      var initialValue = '12th September 1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format DD-MM-YYYY', function () {
      var parsedValue
      var initialValue = '12-09-1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format DD MM YYYY', function () {
      var parsedValue
      var initialValue = '12 09 1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })

    it('allows typed in date with format MM DD YYYY when US countryCode set', function () {
      var parsedValue
      var initialValue = '09 12 1979'

      var listener = function (value) { parsedValue = value }
      var element = renderIntoDocument(<Input onChange={listener} countryCode='us' />)
      var input = findByTag(element, 'input')
      Simulate.change(input, { target: { value: initialValue }})
      element.close()

      parsedValue.should.equal('1979-09-12')
    })
  })
})
