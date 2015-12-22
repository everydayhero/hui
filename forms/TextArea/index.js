'use strict';

import React from 'react'
import inputMessage from '../../mixins/inputMessage'
import LocalStorageMixin from '../../mixins/localStorage'
import textInput from '../../mixins/textInput'
import classnames from 'classnames'

module.exports = React.createClass({
  displayName: 'hui-TextArea',

  mixins: [inputMessage, LocalStorageMixin, textInput],

  propTypes: {
    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    showError: React.PropTypes.bool,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    hint: React.PropTypes.string,
    icon: React.PropTypes.string,
    mask: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    validate: React.PropTypes.func,
    onError: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onTab: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    layout: React.PropTypes.string,
    onIconClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      autoComplete: true,
      storeLocally: false,
      autoFocus: false,
      disabled: false,
      showError: false,
      icon: null,
      initialise: null,
      mask: null,
      onFocus: null,
      onChange: null,
      validate: null,
      onError: null,
      onBlur: function() {},
      onTab: function() {},
      onIconClick: null,
      readOnly: false,
      required: false,
      showIcon: true,
      name: null,
      id: null,
      label: 'Input',
      errors: [],
      errorMessage: '',
      hint: '',
      type: 'text',
      value: '',
      layout: 'full',
      spacing: 'loose'
    };
  },

  getInitialState: function() {
    return {
      hasError: false,
      focused: false,
      valid: false,
      waiting: false
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var value = props.value || '';
    var hasServerErrors = props.errors.length;
    var classes = classnames([
      'hui-TextArea--' + props.layout,
      'hui-TextArea--' + props.spacing,
      'hui-TextArea',
      !!value && !!value.trim() && 'hui-TextArea--hasValue',
      state.focused && 'hui-TextArea--focused',
      state.valid && 'hui-TextArea--valid',
      this.shouldShowError() && 'hui-TextArea--error',
      props.disabled && 'hui-TextArea--disabled'
    ]);

    return (
      <div className={ classes }>
        <div className="hui-TextArea__inputWrap">
          <label className="hui-TextArea__label" htmlFor={ props.name }>{ props.label }</label>
          <textarea className="hui-TextArea__input"
            id={ props.id }
            ref="input"
            value={ props.value }
            disabled={ props.disabled }
            onBlur={ this.handleBlur }
            onChange={ this.handleChange }
            onFocus={ this.handleFocus }
            onTab={ this.onTab }>
          </textarea>
        </div>
        { this.renderMessage() }
      </div>
    )
  }
})
