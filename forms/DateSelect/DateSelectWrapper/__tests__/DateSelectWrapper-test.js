'use strict'

import DateSelectWrapper from '../'

describe('DateSelectWrapper', function () {
  describe('defaults', function () {
    var element = renderIntoDocument(
      <DateSelectWrapper name='foo' />
    )
    var hiddenField = findByTag(element, 'input')

    hiddenField.value.should.equal('')
    hiddenField.name.should.equal('foo')
  })

  describe('change value', function () {
    var element = renderIntoDocument(
      <DateSelectWrapper name='foo' />
    )
    var hiddenField = findByTag(element, 'input')
    var dateSelect = scryByTag(element, 'select')[0]
    var monthSelect = scryByTag(element, 'select')[1]
    var yearSelect = scryByTag(element, 'select')[2]

    Simulate.change(dateSelect, { target: { value: 5 } })
    Simulate.change(monthSelect, { target: { value: 10 } })
    Simulate.change(yearSelect, { target: { value: 2002 } })

    hiddenField.value.should.equal('2002-11-05')
  })

  describe('start with value', function () {
    var element = renderIntoDocument(
      <DateSelectWrapper
        name='foo'
        value='2001-12-12' />
    )
    var hiddenField = findByTag(element, 'input')

    hiddenField.value.should.equal('2001-12-12')
  })
})
