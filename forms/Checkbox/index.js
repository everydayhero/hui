"use strict";

var React      = require('react');
var classnames = require('classnames');
var Errors     = require('../InputErrors');

module.exports = React.createClass({
  displayName: 'Checkbox',

  propTypes: {
    disabled: React.PropTypes.bool,
    labelIsClickable: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    value: React.PropTypes.bool,
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ])
  },

  getDefaultProps: function() {
    return {
      disabled: false,
      labelIsClickable: true
    };
  },

  label: function() {
    var props = this.props;

    if (!props.label) { return; }

    if (props.labelIsClickable) {
      return (
        <label htmlFor={ props.id } className="hui-Checkbox__label">
          { props.label }
        </label>
      );
    }
    return (
      <span className="hui-Checkbox__label">
        { props.label }
      </span>
    );
  },

  handleChange: function(e) {
    var props = this.props;

    if(props.onChange) {
      this.props.onChange(e.target.checked);
    }
  },

  render: function() {
    var props = this.props;
    var errors = props.errors || [];

    var Input = React.DOM.input({
      id: props.id,
      name: props.name || props.id,
      className: "hui-Checkbox__input",
      type: "checkbox",
      value: props.value,
      checked: props.value,
      onChange: this.handleChange,
      autoComplete: 'off',
      disabled: (props.disabled)
    });

    var classes = classnames({
      "hui-Input--error": errors.length > 0
    }, "hui-Checkbox");

    return (
      <div className={ classes }>
        { Input }
        { this.label() }
        <Errors errors={ this.props.errors } />
      </div>
    );
  }
});
