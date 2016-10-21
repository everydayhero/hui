'use strict'

import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import DatePickerDay from '../DatePickerDay'

export default React.createClass({
  displayName: 'hui-Calendar',

  propTypes: {
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    date: React.PropTypes.object,
    onSelectDate: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      date: moment()
    }
  },

  buildDates: function () {
    var props = this.props
    var d = moment().year(props.date.year()).month(props.date.month())
    return _.range(1, d.endOf('month').date() + 1).map(function (day) {
      return moment(d).date(day)
    })
  },

  buildCalendar: function () {
    var dates = this.buildDates(), current = 0, days = []

    for (var week = 0; week <= 5; week++) {
      for (var d = 0; d <= 6; d++) {
        if (dates[current] && dates[current].day() === d) {
          days.push(<DatePickerDay
            date={dates[current]}
            day={d}
            key={dates[current]}
            selectedDate={this.props.date}
            onClick={this.props.onSelectDate} >
              { dates[current].date() }
            </DatePickerDay>)
          current++
        } else if (current < 28) {
          days.push(<div key={d} className='hui-DatePickerDay--filler' />)
        }
      }
    }

    return days
  },

  getWeekDay: function (i) {
    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekDays[i]
  },

  render: function () {
    var weekdays = []
    for (var i = 0; i <= 6; i++) {
      weekdays.push(<div className='hui-Calendar__weekday' key={i}>{ this.getWeekDay(i) }</div>)
    }

    return (
      <div className='hui-Calendar'>
        <div className='hui-Calendar__weekdays'>
          { weekdays }
        </div>
        <div className='hui-Calendar__dates'>
          { this.buildCalendar() }
        </div>
      </div>
    )
  }
})
