"use strict";

var _          = require('lodash');
var React      = require('react');
var classNames = require('classnames');
var Errors     = require('../InputErrors');
var Icon       = require('../../Helpers/Icon');

module.exports = React.createClass({
  displayName: 'SelectInput',

  propTypes: {
    includeBlank: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    options: React.PropTypes.array,
    prompt: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      includeBlank: false,
      labelKey: 'label',
      options: [],
      prompt: null,
      selectionMade: false,
      valid: true,
      value: null,
      valueKey: 'value'
    };
  },

  getInitialState: function() {
    return {
      focused: false
    };
  },

  onChange: function(event) {
    var onChange = this.props.onChange;
    var value = event.target.value;

    this.setState({
      value: value
    });

    if (onChange) {
      onChange(value);
    }
  },

  onBlur: function(e) {
    var onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(e);
    }
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var value = props.value;

    var classes = classNames({
      'hui-Input--error': !props.valid,
      'hui-SelectInput--focused': state.focused
    }, 'hui-SelectInput', props.className);

    return (
      <div className={ classes }>
        { this.renderLabel() }
        { this.renderDisplayValue() }
        <Icon icon="chevron-down" className="hui-SelectInput__icon"/>
        <select
          autoComplete="off"
          className="hui-SelectInput__input"
          id={ props.id }
          name={ props.name || props.id }
          onBlur={ this.onBlur }
          onChange={ this.onChange }
          value={ value }>
            { this.renderOptions() }
        </select>
        <Errors errors={ props.errors } />
      </div>
    );
  },

  renderLabel: function() {
    var props = this.props;

    if (props.label && !props.value) {
      return React.DOM.label({
        className: "hui-SelectInput__label",
        htmlFor: props.id,
      }, props.label);
    }
  },

  renderDisplayValue: function() {
    var props          = this.props;
    var value          = props.value;
    var className      = "hui-SelectInput__selected";
    var displayValue   = props.prompt;
    var selectedOption = this.getSelected();
    var firstOption    = this.getOptions()[0];
    var firstLabel     = firstOption && firstOption[props.labelKey];

    if (!value && !firstLabel && !this.props.selectionMade) {
      className += "--noSelection";
    }

    if (selectedOption) {
      displayValue = selectedOption[props.labelKey];
    } else if (firstLabel) {
      displayValue = firstLabel;
    }

    return (
      <span className="hui-SelectInput__displayValue">
        <span className={ className }>
          { displayValue }
        </span>
      </span>
    );
  },

  getSelected: function() {
    var options = this.getOptions();
    var props = this.props;
    var criteria = {};

    criteria[props.valueKey] = props.value;

    return _.where(options, criteria)[0];
  },

  getOptions: function() {
    var props = this.props;
    var options = props.options.slice();
    var blank = {};

    if (props.includeBlank) {
      blank[props.valueKey] = "";
      blank[props.labelKey] = "";
      options.unshift(blank);
    }

    return options;
  },

  renderOptions: function() {
    var props = this.props;
    var valueKey = props.valueKey;
    var labelKey = props.labelKey;
    var options = this.getOptions();

    return _.map(options, function(option, index) {
      var optionValue = option[valueKey];

      return (
        <option
          key={ index }
          value={ optionValue } >
          { option[labelKey] }
        </option>
        );
    });
  }
});
