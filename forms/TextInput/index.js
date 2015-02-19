"use strict";

var React            = require('react');
var cx               = require('react/lib/cx');
var InputErrors      = require('../InputErrors');
var placeholderMixin = require('../../mixins/placeholderMixin');
var nextId           = 0;

module.exports = React.createClass({
  displayName: 'hui-TextInput',
  mixins: [placeholderMixin],

  propTypes: {
    id: React.PropTypes.string,
    errors: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    type: React.PropTypes.string,
    className: React.PropTypes.string,
    autoComplete: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      errors: null,
      id: ['text-input', ++nextId].join('-'),
      placeholder: null,
      readOnly: false,
      type: 'text',
      value: '',
      autoComplete: 'off'
    };
  },

  focus: function() {
    this.refs.input.getDOMNode().focus();
  },

  blur: function() {
    this.refs.input.getDOMNode().blur();
  },

  render: function() {
    var props = this.props;

    var classes = {
      "hui-TextInput": true,
      "hui-TextInput--error": this.hasErrors(),
      "hui-TextInput--readOnly": this.props.readOnly
    };

    classes[props.className] = true;

    return (
      <span className={ cx(classes) }>
        { this.renderPlaceholder() }
        { this.renderInput() }
        <InputErrors errors={ props.errors } />
      </span>
    );
  },

  renderInput: function() {
    var props = this.props;

    return (
      <input
        {...props}
        autoComplete="off"
        className="hui-TextInput__input"
        placeholder=""
        ref="input" />
    );
  },

  hasErrors: function() {
    var errors = this.props.errors;
    return errors && errors.length > 0;
  }
});
