"use strict";

var _                 = require('lodash');
var React             = require('react');
var Icon              = require('../../Helpers/Icon');
var LocalStorageMixin = require('../../mixins/localStorage');
var inputMessage      = require('../../mixins/inputMessage');
var classNamesArray   = require('../../lib/classNamesArray');

module.exports = React.createClass({
  displayName: 'SelectInput',

  mixins: [LocalStorageMixin, inputMessage],

  propTypes: {
    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    hint: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    includeBlank: React.PropTypes.bool,
    onTab: React.PropTypes.func,
    required: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    options: React.PropTypes.array,
    prompt: React.PropTypes.string,
    value: React.PropTypes.string,
    labelKey: React.PropTypes.string,
    valueKey: React.PropTypes.string,
    errors: React.PropTypes.array,
    label: React.PropTypes.string,
    errorMessage: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      autoComplete: true,
      storeLocally: false,
      autoFocus: false,
      disabled: false,
      name: null,
      hint: '',
      onFocus: null,
      onChange: null,
      onBlur: function() {},
      includeBlank: false,
      onTab: function() {},
      required: false,
      spacing: 'loose',
      layout: 'full',
      options: [],
      prompt: null,
      value: null,
      labelKey: 'label',
      valueKey: 'value',
      errors: [],
      label: 'Select',
      errorMessage: null
    };
  },

  getInitialState: function() {
    return {
      focused: false
    };
  },

  componentDidMount: function() {
    var props = this.props;

    if (props.disabled) { return; }
    if (props.autoFocus) { this.refs.input.getDOMNode().focus(); }
  },

  onChange: function(event) {
    var onChange = this.props.onChange;
    var value = event.target.value;
    var hasError = this.props.required ? !value : false;

    this.setState({
      value: value,
      hasError: hasError
    });

    if (onChange) {
      onChange(value);
    }
  },

  onBlur: function() {
    var props = this.props;
    var hasError = props.required ? !props.value : false;

    if (props.onBlur) { props.onBlur(props.value); }
    this.setState({focused: false, hasError: hasError});
  },

  onFocus: function() {
    var props = this.props;
    if (props.onFocus) { props.onFocus(props.value); }
    this.setState({focused: true, valid: true});
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

    if(!props.value) {
      return;
    }

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
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var value = props.value;
    var hasServerErrors = props.errors.length;
    var layout = props.layout;
    var spacing= props.spacing;
    var classes = classNamesArray([
      'hui-SelectInput--' + layout,
      'hui-SelectInput--' + spacing,
      'hui-SelectInput',
      !!value && 'hui-SelectInput--hasValue',
      state.focused && 'hui-SelectInput--focused',
      state.valid && 'hui-SelectInput--valid',
      this.shouldShowError() && 'hui-SelectInput--error',
      props.disabled && 'hui-SelectInput--disabled'
    ]);

    return (
      <div className={ classes }>
        <div className="hui-SelectInput__wrap">
          <label className="hui-SelectInput__label">{ props.label }</label>
          { this.renderDisplayValue() }
          <Icon icon="chevron-down" className="hui-SelectInput__icon"/>
          <div className="hui-SelectInput__inputWrap">
            <select
              autoComplete={ props.autoComplete }
              className="hui-SelectInput__input"
              id={ props.id }
              disabled={ props.disabled }
              name={ props.name || props.id }
              onBlur={ this.onBlur }
              onFocus={ this.onFocus }
              onChange={ this.onChange }
              onKeyDown={ this.onTab }
              value={ value }>
                { this.renderOptions() }
            </select>
          </div>
        </div>
        { this.renderMessage(props.errorMessage || hasServerErrors || props.hint) }
      </div>
    );
  }
});
