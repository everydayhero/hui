"use strict";

var React      = require('react');
var Icon       = require('../Helpers/Icon');

module.exports = {
  componentDidMount: function() {
    var props = this.props;
    if (props.disabled) { return; }

    var value = this.props.value;
    var validate = props.validate;
    var onError = props.onError;
    if (props.autoFocus) { this.refs.input.getDOMNode().focus(); }
    if (value && validate) { this.validate(); }
    if (onError && validate) { onError(!validate(value)); }

    this.setValueQuietly(this.refs.input.getDOMNode().value);
  },

  componentWillReceiveProps: function(nextProps) {
    var state = this.state;

    if (nextProps.showError && !state.hasError && !state.valid && !state.focused) { this.validate(); }
  },

  maskValue: function(value) {
    if (!this.props.mask) { return value; }
    return this.props.mask(value);
  },

  handleChange: function(e) {
    this.setValueQuietly(e.target.value);
  },

  setValueQuietly: function(value) {
    var props = this.props;

    if (props.readOnly || props.disabled) { return false; }

    this.setState({
      hasError: false,
      valid: false
    });

    var onChange = props.onChange;
    var onError = props.onError;
    var validate = props.validate;

    if (onChange) { onChange(value); }
    if (onError && validate) { onError(!validate(value)); }
  },

  handleFocus: function() {
    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus({
        element: this.getDOMNode(),
        value: this.props.value
      });
    }
  },

  handleBlur: function() {
    var props = this.props;

    this.setState({ focused: false });
    if (props.required) { this.validate(); }
    this.props.onBlur(props.value);
  },

  setValid: function(valid) {
    var onError = this.props.onError;

    this.setState({
      hasError: !valid,
      valid: valid,
      waiting: false
    }, function() {
      if (onError) { onError(!valid); }
    });
  },

  validate: function() {
    var props = this.props;
    var value = this.props.value || '';
    var hasValue = !!value.trim();

    if (hasValue && props.validate) {
      this.setState({ waiting: true });
      props.validate(value, this.setValid);
    } else {
      this.setValid(hasValue);
    }
  },

  renderIcon: function() {
    var props = this.props;
    var errors = props.errors || [];
    var hasServerErrors = errors.length;
    var state = this.state;
    var icon = !props.showIcon ? false
               : state.waiting ? 'refresh'
               : (state.valid && !hasServerErrors) ? 'check'
               : (state.hasError || hasServerErrors) ? 'times'
               : props.disabled ? 'minus'
               : props.icon ? props.icon
               : (props.required && !props.value) ? 'caret-left'
               : false;

    if (!icon) { return; }

    if (props.onIconClick) {
      return (
        <button className="hui-TextInput__iconButton hui-TextInput__icon" onClick={ props.onIconClick }>
          <Icon icon={ icon } fixedWidth={ true } />
        </button>
      );
    }
    return (
      <span className="hui-TextInput__icon">
        <Icon icon={ icon } className="hui-TextInput__icon" fixedWidth={ true } />
      </span>
    );
  },

  inputMethods: function(bool) {
    return bool && {
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus
    };
  }
};
