'use strict'

import React from 'react/addons'
import LocalStorageMixin from '../../mixins/localStorage'
import inputMessage from '../../mixins/inputMessage'
import textInput from '../../mixins/textInput'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'TextInput',

  mixins: [LocalStorageMixin, inputMessage, textInput],

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.oneOf(['text', 'number']),
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    placeHolder: React.PropTypes.string,
    className: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    hint: React.PropTypes.string,
    icon: React.PropTypes.string,
    iconPosition: React.PropTypes.string,
    spacing: React.PropTypes.oneOf(['compact', 'tight', 'fitted', 'loose']),
    layout: React.PropTypes.oneOf(['full', 'wide', 'twoThirds', 'half', 'narrow', 'quarter', 'threeQuarters', 'eighth', 'sevenEighths', 'third']),

    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    showError: React.PropTypes.bool,
    required: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,

    errors: React.PropTypes.array,

    limit: React.PropTypes.number,

    mask: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    validate: React.PropTypes.func,
    onError: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onTab: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onIconClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      id: '',
      name: '',
      type: 'text',
      value: '',
      label: 'Input',
      placeHolder: '',
      className: '',
      errorMessage: '',
      hint: '',
      icon: '',
      iconPosition: 'right',
      spacing: 'loose',
      layout: 'full',

      autoComplete: true,
      storeLocally: false,
      autoFocus: false,
      disabled: false,
      showError: false,
      required: false,
      showIcon: true,

      errors: [],

      limit: 0,

      mask: str => str,
      onFocus: () => {},
      onChange: () => {},
      validate: null,
      onError: () => {},
      onBlur: () => {},
      onTab: () => {},
      onKeyDown: () => {},
      onIconClick: () => {}
    }
  },

  getInitialState() {
    return {
      hasError: false,
      focused: false,
      valid: false,
      waiting: false
    }
  },

  render() {
    let props = this.props
    let state = this.state
    let errors = props.errors || []
    let valueType = typeof props.value
    let value = (valueType === 'string' || valueType === 'number') ? props.value.toString() : ''
    let hasServerErrors = errors.length
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
      'hui-TextInput__input--icon-left': iconsLeft,
      'hui-TextInput__input--icon': !iconsLeft,
      'hui-TextInput__input': true
    })

    return (
      <div className={ classes }>
        <label className="hui-TextInput__label" htmlFor={ props.name } ref={ props.ref }>
          { props.label }
          <input { ...this.inputMethods(!props.disabled) }
            autoComplete={ props.autoComplete ? 'on' : 'off' }
            className={ inputClassName }
            disabled={ props.disabled }
            id={ props.id || props.name }
            name={ props.name }
            ref="input"
            onKeyDown={ (e) => {
              this.onTab(e)
              this.props.onKeyDown(e)
            } }
            type={ props.type }
            value={ value } />
          { this.renderPlaceHolder() }
          { this.renderIcon() }
        </label>
        { this.renderMessage(props.errorMessage || hasServerErrors || props.hint) }
      </div>
    )
  }
})
