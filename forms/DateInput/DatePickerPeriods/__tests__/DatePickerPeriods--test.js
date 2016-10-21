'use strict'

import { mount } from 'enzyme'
import moment from 'moment'

import DatePickerPeriods from '../'

describe('DatePickerPeriod', function () {
  describe('selection and navigation', function () {
    var date = moment('2014-10-20T14:30:00+10:00')
    var element

    beforeEach(function () {
      var onChange = function (value) {
        date.year(value)
        this.setProps({ current: value, date })
      }
      element = mount(<DatePickerPeriods type='year' date={date} current={2014} />)
      element.setProps({ onChange: onChange.bind(element) })
    })

    it('renders three periods around current', function () {
      var periods = element.find('.hui-DatePickerPeriod')

      periods.at(0).text().should.contain('2013')
      periods.at(1).text().should.contain('2014')
      periods.at(2).text().should.contain('2015')
    })

    it('renders a selected period', function () {
      var selected = element.find('.hui-DatePickerPeriod--selected')

      selected.text().should.contain('2014')
    })

    it('navigates forward', function () {
      var forward = element.find('.hui-DatePickerPeriods__forward')
      var periods = element.find('.hui-DatePickerPeriod')
      forward.simulate('click')

      periods.at(2).text().should.contain('2016')
    })

    it('navigates backwards', function () {
      var back = element.find('.hui-DatePickerPeriods__back')
      var periods = element.find('.hui-DatePickerPeriod')
      back.simulate('click')

      periods.at(0).text().should.contain('2013')
    })
  })

  describe('types', function () {
    var date = moment('2014-11-20T14:30:00+10:00')
    var element

    beforeEach(function () {
      var onChange = function (value) {
        date.month(value)
        this.setProps({ current: value, date })
      }
      element = mount(<DatePickerPeriods type='month' date={date} current={11} />)
      element.setProps({ onChange: onChange.bind(element) })
    })

    it('renders three periods around current', function () {
      var periods = element.find('.hui-DatePickerPeriod')

      periods.at(0).text().should.contain('Oct')
      periods.at(1).text().should.contain('Nov')
      periods.at(2).text().should.contain('Dec')
    })

    it('loops on forward', function () {
      var forward = element.find('.hui-DatePickerPeriods__forward')
      var periods = element.find('.hui-DatePickerPeriod')
      forward.simulate('click')

      periods.at(2).text().should.contain('Jan')
    })

    it('loops on back', function () {
      var back, periods
      date = moment('2014-02-20T14:30:00+10:00')
      element = mount(
        <DatePickerPeriods type='month' date={date} current={1} />
      )
      back = element.find('.hui-DatePickerPeriods__back')
      periods = element.find('.hui-DatePickerPeriod')
      back.simulate('click')

      periods.at(0).text().should.contain('Jan')
    })
  })
})
