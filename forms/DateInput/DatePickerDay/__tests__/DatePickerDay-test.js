'use strict'

import DatePickerDay from '../'
import moment from 'moment'

import ReactDOM from 'react-dom'

describe('DatePickerDay', function () {
  describe('selected', function () {
    var date = moment('2014-10-20 4:30 +0000', 'YYYY-MM-DD HH:mm Z')
    var element = renderIntoDocument(<DatePickerDay date={date} selectedDate={date} />)

    it('renders day as selected', function () {
      var className = ReactDOM.findDOMNode(element).className

      className.should.contain('hui-DatePickerDay--selected')
    })
  })

  describe('today', function () {
    var date = moment()
    var element = renderIntoDocument(<DatePickerDay date={date} selectedDate={date} />)

    it('renders day as selected', function () {
      var className = ReactDOM.findDOMNode(element).className

      className.should.contain('hui-DatePickerDay--today')
    })
  })

  describe('onClick', function () {
    it('is fired onClick', function () {
      var date = moment('2014-10-20 4:30 +0000', 'YYYY-MM-DD HH:mm Z')
      var listener = sinon.spy()
      var element = renderIntoDocument(<DatePickerDay onClick={listener} date={date} />)

      date = ReactDOM.findDOMNode(element)
      Simulate.click(date)

      listener.should.have.been.called
    })
  })
})
