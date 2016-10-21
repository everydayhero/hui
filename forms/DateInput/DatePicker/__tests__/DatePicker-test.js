'use strict'

import DatePicker from '../'
import moment from 'moment'

describe('DatePicker', function () {
  var date, component, passedDate

  beforeEach(function () {
    date = moment()
    passedDate = null
    var onChangeSelection = val => passedDate = val
    component = renderIntoDocument(<DatePicker date={date} onChangeSelection={onChangeSelection} />)
  })

  it('should set the month state', function () {
    var month = 1
    component.setMonth(month)
    passedDate.month().should.equal(month)
  })

  it('should set the year state', function () {
    var year = 2015
    component.setYear(year)
    passedDate.year().should.equal(year)
  })
})
