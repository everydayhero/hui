"use strict";

var React  = require('react');
var cx     = require('react/lib/cx');
var Errors = require('../InputErrors');

module.exports = React.createClass({
  displayName: 'Checkbox',

  getDefaultProps: function() {
    return {
      valid: true,
      labelIsClickable: false,
      labelContainsHtml: false
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
      autoComplete: 'off'
    });

    var classes = cx({
      "hui-Checkbox": true,
      "hui-Input--error": !this.props.valid
    });

    return (
      <div className={ classes }>
        { Input }
        { Label }
        <Errors errors={ this.props.errors } />
      </div>
    );
  }
});
