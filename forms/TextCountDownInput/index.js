"use strict";

var React             = require('react');
var Input             = require('../TextInput');

module.exports = React.createClass({
  displayName: 'TextCountDownInput',

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
    onIconClick: React.PropTypes.func,
    max: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      onChange: function() {},
      max: 100,
      warnMax: 90,
      value: '',
      layout: 'full',
      spacing: 'loose',
      errors: [],
      maxErrorMessage: "Maximum {{max}} characters"
    };
  },

  render: function() {
    var props   = this.props;
    var value   = props.value || '';
    var maxed   = value.length > props.max;
    var maxWarn =  value.length > props.warnMax && value.length <= props.max;
    var errors  = props.errors;
    var classes = [
      'hui-TextCountDownInput--' + props.layout,
      'hui-TextCountDownInput--' + props.spacing,
      "hui-TextCountDownInput"
    ].join(' ');
    var counterClasses = [
      maxed && 'hui-TextCountDownInput__counter--maxed',
      maxWarn && 'hui-TextCountDownInput__counter--warn',
      "hui-TextCountDownInput__counter"
    ].join(' ');

    if(maxed) {
      errors = [props.maxErrorMessage.replace('{{max}}', props.max)];
    }

    return (
      <div className={ classes }>
        <Input {...props} errors={ errors } layout="full" spacing="compact" showIcon={ false }/>
        <div className={ counterClasses }>
          { value.length }
        </div>
      </div>
    );
  }
});
