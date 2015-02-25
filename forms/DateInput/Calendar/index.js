"use strict";

var React         = require('react');
var moment        = require('moment');
var _             = require('lodash');
var DatePickerDay = require('../DatePickerDay');

module.exports = React.createClass({
  displayName: 'hui-Calendar',

  propTypes: {
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    date: React.PropTypes.object,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    var now = moment();
    return {
      year: now.year(),
      month: now.month()
    };
  },

  buildDates: function() {
    var d = moment().year(this.props.year).month(this.props.month);
    return _.range(1, d.endOf('month').date() + 1).map(function(day) {
      return moment(d).date(day);
    });
  },

  buildCalendar: function() {
    var dates = this.buildDates(), current = 0, days = [];

    for (var week = 0; week <= 5; week++) {
      for (var d = 0; d <= 6; d++) {
        if (dates[current] && dates[current].day() === d) {
           days.push(<DatePickerDay
             date={ dates[current] }
             day={ d }
             key={ dates[current] }
             selectedDate={ this.props.date }
             onClick={ this.props.onSelectDate } >
              { dates[current].date() }
            </DatePickerDay>);
          current++;
        } else if (current < 28) {
           days.push(<div key={ d } className="hui-DatePickerDay--filler" />);
        }
      }
    }

    return days;
  },

  getWeekDay: function(i) {
    var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekDays[i];
  },

  render: function() {
    var weekdays = [];
    for (var i = 0; i <= 6; i++) {
      weekdays.push(<div className="hui-Calendar__weekday" key={ i }>{ this.getWeekDay(i) }</div>);
    }

    return (
      <div className="hui-Calendar">
        <div className="hui-Calendar__weekdays">
          { weekdays }
        </div>
        <div className="hui-Calendar__dates">
          { this.buildCalendar() }
        </div>
      </div>
    );
  }
});