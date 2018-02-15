import React from 'react'
import classnames from 'classnames'

import {types, defaults} from '../../mixins/textInputProps'
import textInput from '../../mixins/textInput'
import inputMessage from '../../mixins/inputMessage'

const MINUTE = 60
const HOUR = 60 * 60

const hours = (duration) => (duration - duration % HOUR) / HOUR
const minutes = (duration) => (duration % HOUR - duration % MINUTE) / MINUTE
const seconds = (duration) => duration % MINUTE

const durationComponents = (durationInSeconds) => {
  return {
    hours: hours(durationInSeconds),
    minutes: minutes(durationInSeconds),
    seconds: seconds(durationInSeconds)
  }
}

const DurationInput = React.createClass({
  displayName: 'DurationInput',

  mixins: [textInput, inputMessage],

  propTypes: {
    ...types,
    value: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      ...defaults,
      value: 0
    }
  },

  getInitialState () {
    return {
      hasError: false,
      focused: false,
      valid: false,
      dirty: false,
      hours: 0,
      hoursDirty: false,
      minutes: 0,
      minutesDirty: false,
      seconds: 0,
      secondsDirty: false
    }
  },

  focus () {
    this.refs.hoursInput.focus()
  },

  blur () {
    this.refs.hoursInput.blur()
    this.refs.minutesInput.blur()
    this.refs.secondsInput.blur()
  },

  onChange (type, value) {
    const numberwang = /\d{1,2}/.exec(value)
    this.setState({
      [type]: numberwang && Number(numberwang[0]),
      [`${type}Dirty`]: true
    }, () => {
      const {hours, minutes, seconds} = this.state

      const totalSeconds = (60 * 60 * hours) + (60 * minutes) + Number(seconds)

      this.props.onChange(totalSeconds)
    })
  },

  onFocus () {
    const { disabled, readOnly } = this.props
    this.setValid(true)

    if (disabled) { return }

    if (!readOnly) {
      this.setState({ focused: true })
    }
  },

  onBlur () {
    let { disabled, readOnly } = this.props
    if (disabled || readOnly) { return }

    this.setState({ focused: false })
  },

  hoursChange (event) {
    this.onChange('hours', event.target.value)
  },

  minutesChange (event) {
    this.onChange('minutes', event.target.value)
  },

  secondsChange (event) {
    this.onChange('seconds', event.target.value)
  },

  componentDidMount () {
    const {value} = this.props

    if (value > 0) {
      this.setState({
        ...durationComponents(value),
        hoursDirty: true,
        minutesDirty: true,
        secondsDirty: true
      })
    }
  },

  render () {
    let {
      value,
      className,
      layout,
      spacing,
      disabled,
      id,
      name,
      label,
      ref,
      readOnly
    } = this.props

    let state = this.state
    let classes = classnames([
      className,
      'hui-DurationInput--' + layout,
      'hui-DurationInput--' + spacing,
      'hui-DurationInput',
      !!value && 'hui-DurationInput--hasValue',
      state.focused && 'hui-DurationInput--focused',
      state.valid && 'hui-DurationInput--valid',
      disabled && 'hui-DurationInput--disabled'
    ])

    let inputClassName = 'hui-DurationInput__input hui-DurationInput__duration'
    let inputId = id || name

    const {hours, minutes, seconds} = durationComponents(value)

    return (
      <div className={classes}>
        <label className='hui-DurationInput__label' htmlFor={inputId} ref={ref}>
          {label}

          <div className='hui-DurationInput__duration_components'>
            <div className='hui-DurationInput__duration_component'>
              <input
                className={inputClassName}
                disabled={disabled}
                id={`${inputId}_hours`}
                name={`${name}_hours`}
                ref='hoursInput'
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.hoursChange}
                type='tel'
                pattern='\d{0,2}'
                value={state.hoursDirty ? hours : ''}
                placeholder='00'
                readOnly={readOnly} />

              <span className='hui-DurationInput__duration_component_label'>
                {'hr'}
              </span>
            </div>

            <div className='hui-DurationInput__duration_component'>
              <input
                className={inputClassName}
                disabled={disabled}
                id={`${inputId}_minutes`}
                name={name}
                ref='minutesInput'
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.minutesChange}
                type='tel'
                pattern='\d{0,2}'
                value={state.minutesDirty ? minutes : ''}
                placeholder='00'
                readOnly={readOnly} />

              <span className='hui-DurationInput__duration_component_label'>
                {'min'}
              </span>
            </div>

            <div className='hui-DurationInput__duration_component'>
              <input
                className={inputClassName}
                disabled={disabled}
                id={`${inputId}_seconds`}
                name={name}
                ref='secondsInput'
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.secondsChange}
                type='tel'
                pattern='\d{0,2}'
                value={state.secondsDirty ? seconds : ''}
                placeholder='00'
                readOnly={readOnly} />

              <span className='hui-DurationInput__duration_component_label'>
                {'s'}
              </span>
            </div>
          </div>
        </label>
      </div>
    )
  }
})

export default DurationInput
