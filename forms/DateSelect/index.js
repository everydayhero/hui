'use strict'

import React from 'react'
import SelectInput from '../SelectInput'
import moment from 'moment'
import inputMessage from '../../mixins/inputMessage'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'DateSelect',

  mixins: [inputMessage],

  propTypes: {
    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    includeBlank: React.PropTypes.bool,
    onTab: React.PropTypes.func,
    required: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    errorMessage: React.PropTypes.node,
    months: React.PropTypes.array,
    monthLabel: React.PropTypes.node,
    yearLabel: React.PropTypes.node,
    dateLabel: React.PropTypes.node,
    promptValue: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      yearLabel: 'Year',
      monthLabel: 'Month',
      dateLabel: 'Date',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      layout: 'full',
      spacing: 'loose',
      format: 'YYYY-MM-DD',
      value: '',
      includeBlank: true,
      promptValue: '1980-01-01',
      errors: [],
      autoComplete: true,
      disabled: false,
      readOnly: false
    }
  },

  getInitialState: function () {
    return {
      hasError: false,
      valid: false
    }
  },

  onChange: function (type, value) {
    var props = this.props
    var currentValue = props.value || moment(props.promptValue).format(props.format)
    var date = moment(currentValue, props.format)[type](Number(value))

    if (props.onChange) {
      props.onChange(date.format(props.format))
    }
  },

  yearChange: function (value) {
    this.onChange('year', value)
  },

  monthChange: function (value) {
    this.onChange('month', value)
  },

  dateChange: function (value) {
    this.onChange('date', value)
  },

  getYears: function () {
    var year = moment().year()
    var minYear = 1899
    var years = []
    while (year !== minYear) {
      years.push({ value: year.toString(), label: year })
      year--
    }

    return years
  },

  getMonths: function () {
    var month = 0
    var months = []

    while (month !== 12) {
      months.push({ value: month.toString(), label: this.props.months[month] })
      month++
    }

    return months
  },

  getDays: function () {
    var date = 1
    var dates = []
    var props = this.props
    var value = props.value || props.promptValue
    var momentDate = moment(value, props.format)
    while (date !== momentDate.daysInMonth() + 1) {
      dates.push({ value: date.toString(), label: date })
      date++
    }

    return dates
  },

  render: function () {
    var props = this.props
    var state = this.state
    var date
    if (props.value) {
      date = moment(props.value, props.format)
    }
    var dateValue = date ? date.date() : ''
    var monthValue = date ? date.month() : ''
    var yearValue = date ? date.year() : ''
    var passedProps = {
      includeBlank: props.includeBlank,
      autoComplete: props.autoComplete,
      disabled: props.disabled,
      readOnly: props.readOnly
    }
    var classes = classnames([
      'hui-DateSelect--' + props.layout,
      'hui-DateSelect--' + props.spacing,
      'hui-DateSelect',
      state.focused && 'hui-DateSelect--focused',
      state.valid && 'hui-DateSelect--valid',
      this.shouldShowError() && 'hui-DateSelect--error',
      props.disabled && 'hui-DateSelect--disabled'
    ])

    monthValue = monthValue.toString()
    yearValue = yearValue.toString()
    dateValue = dateValue.toString()

    return (
      <div className={classes}>
        <div className='hui-DateSelect__wrap'>
          <SelectInput
            id={props.id + '_date'}
            value={dateValue}
            className='hui-DateSelect__date'
            onChange={this.dateChange}
            layout='third'
            spacing='compact'
            label={props.dateLabel}
            options={this.getDays()}
            prompt={moment(props.promptValue).date().toString()}
            {...passedProps} />
          <SelectInput
            id={props.id + '_month'}
            value={monthValue}
            className='hui-DateSelect__month'
            onChange={this.monthChange}
            layout='third'
            spacing='compact'
            label={props.monthLabel}
            options={this.getMonths()}
            prompt={this.props.months[moment(props.promptValue).month()]}
            {...passedProps} />
          <SelectInput
            id={props.id + '_year'}
            value={yearValue}
            className='hui-DateSelect__year'
            onChange={this.yearChange}
            layout='third'
            spacing='compact'
            label={props.yearLabel}
            options={this.getYears()}
            prompt={moment(props.promptValue).year().toString()}
            {...passedProps} />
        </div>
        { this.renderMessage() }
      </div>
    )
  }
})
