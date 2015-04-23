"use strict";

var React      = require('react');
var Classnames = require('classnames');
var Errors     = require('../InputErrors');

module.exports = React.createClass({
  displayName: 'Checkbox',

  getDefaultProps: function() {
    return {
      valid: true,
      labelIsClickable: false,
      labelContainsHtml: false,
      enabled: true
    };
  },

  textLabel: function() {
    var props = this.props;

    if (props.labelContainsHtml) {
      return React.DOM.span({
        className: "hui-Checkbox__label",
        dangerouslySetInnerHTML: { __html: props.label },
      });
    } else {
      return React.DOM.span({
        className: "hui-Checkbox__label"
      }, props.label);
    }
  },

  clickableLabel: function() {
    var props = this.props;

    if (props.labelContainsHtml) {
      return React.DOM.label({
        className: "hui-Checkbox__label",
        htmlFor: props.id,
        dangerouslySetInnerHTML: { __html: props.label },
      });
    } else {
      return React.DOM.label({
        className: "hui-Checkbox__label",
        htmlFor: props.id,
      }, props.label);
    }
  },

  render: function() {
    var props = this.props;
    var enabled = props.enabled;
    var Label;

    if (props.labelIsClickable) {
      Label = this.clickableLabel();
    } else {
      Label = this.textLabel();
    }

    var Input = React.DOM.input({
      id: props.id,
      name: props.name || props.id,
      className: "hui-Checkbox__input",
      type: "checkbox",
      value: props.value,
      checked: props.value,
      onChange: props.onChange,
      autoComplete: 'off',
      disabled: (!enabled)
    });

    var classes = Classnames({
      "hui-Input--error": !this.props.valid
    }, "hui-Checkbox");

    return (
      <div className={ classes }>
        { Input }
        { Label }
        <Errors errors={ this.props.errors } />
      </div>
    );
  }
});
