'use strict';

var React      = require('react');
var classnames = require('classnames');
var Errors     = require('../InputErrors');

module.exports = React.createClass({
  displayName: 'Checkbox',

  propTypes: {
    id: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    labelIsClickable: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
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

  handleChange: function(e) {
    var props = this.props;

    if(props.onChange) {
      this.props.onChange(e.target.checked);
    }
  },

  handleBlur: function(e) {
    var props = this.props;

    if(props.onBlur) {
      this.props.onBlur(e.target.checked);
    }
  },

  renderLabel: function() {
    var props = this.props;

    if (props.labelIsClickable) {
      return props.label && (
        <label htmlFor={ props.id } className="hui-Checkbox__label">
          { props.label }
        </label>
      );
    } else {
      return props.label && (
        <span className="hui-Checkbox__label">
          { props.label }
        </span>
      );
    }
  },

  render: function() {
    var props = this.props;
    var errors = props.errors || [];

    var Input = React.DOM.input({
      id: props.id,
      name: props.name || props.id,
      className: 'hui-Checkbox__input',
      type: 'checkbox',
      value: props.value,
      checked: props.value,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      autoComplete: 'off',
      disabled: (props.disabled)
    });

    var classes = classnames({
      'hui-Input--error': errors.length > 0
    }, 'hui-Checkbox');

    return (
      <div className={ classes }>
        { Input }
        { this.renderLabel() }
        <Errors errors={ this.props.errors } />
      </div>
    );
  }
});
