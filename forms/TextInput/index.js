'use strict'

import React from 'react'
import LocalStorageMixin from '../../mixins/localStorage'
import inputMessage from '../../mixins/inputMessage'
import textInput from '../../mixins/textInput'
import { types, defaults } from '../../mixins/textInputProps'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'TextInput',

  mixins: [LocalStorageMixin, inputMessage, textInput],

  propTypes: types,

  getDefaultProps () {
    return defaults
  },

  getInitialState () {
    return {
      hasError: false,
      focused: false,
      valid: false,
      waiting: false
    }
  },

  focus () {
    this.refs.input.focus()
  },

  blur () {
    this.refs.input.blur()
  },

  render () {
    let props = this.props
    let state = this.state
    let valueType = typeof props.value
    let value = (valueType === 'string' || valueType === 'number') ? props.value.toString() : ''
    let iconsLeft = (props.iconPosition === 'left')
    let classes = classnames([
      props.className,
      'hui-TextInput--' + props.layout,
      'hui-TextInput--' + props.spacing,
      'hui-TextInput',
      !!value && !!value.trim() && 'hui-TextInput--hasValue',
      state.focused && 'hui-TextInput--focused',
      state.valid && 'hui-TextInput--valid',
      this.shouldShowError() && 'hui-TextInput--error',
      props.disabled && 'hui-TextInput--disabled'
    ])

    let inputClassName = classnames({
      'hui-TextInput__input--icon-left': this.hasIcon() && iconsLeft,
      'hui-TextInput__input--icon': this.hasIcon() && !iconsLeft,
      'hui-TextInput__input': true
    })
    let inputId = props.id || props.name

    return (
      <div className={classes}>
        <label className='hui-TextInput__label' htmlFor={inputId} ref={props.ref}>
          {props.label}
          <input {...this.inputMethods(!props.disabled)}
            autoComplete={props.autoComplete ? 'on' : 'off'}
            className={inputClassName}
            disabled={props.disabled}
            id={inputId}
            name={props.name}
            ref='input'
            onKeyDown={(e) => {
              this.onTab(e)
              this.props.onKeyDown(e)
            }}
            type={props.type}
            value={value}
            readOnly={props.readOnly} />
          {this.renderPlaceHolder()}
          {this.renderIcon()}
        </label>
        {this.renderMessage()}
      </div>
    )
  }
})
