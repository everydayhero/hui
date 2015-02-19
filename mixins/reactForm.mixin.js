"use strict";

var React               = require('react');
var FormRow             = require('../forms/FormRow');
var TextInput           = require('../forms/TextInput');
var actions             = require('./reactFormActions');
var nullEmptyStringDeep = require('../lib/nullEmptyStringDeep');

module.exports = {
  getInitialState: function() {
    var form = {};
    if (this.initialiseForm) {
      this.initialiseForm(form);
    }
    return {
      form: form
    };
  },

  inputChangeEventFn: function(key) {
    return function(e) {
      var form = this.state.form;
      var value = e.target.value;

      if (e.target.type === 'checkbox') {
        value = e.target.checked;
      }

      if (form[key] != value) {
        actions.dismissGlobalFlash();
      }
      if (value === '') {
        value = null;
      }

      form[key] = value;
      this.setState({form: form}, this.onChange);
    }.bind(this);
  },

  changeFormPropertyFn: function(key) {
    return function(obj) {
      var form = this.state.form;

      if (form[key] != obj) {
        actions.dismissGlobalFlash();
      }

      form[key] = nullEmptyStringDeep(obj);
      this.setState({form: form}, this.onChange);
    }.bind(this);
  },

  formRow: function(children, name, noHint) {
    var constructor = this.constructor || {};

    return (
      <FormRow
        label={ this.t(name + '_label') }
        hint={ !noHint && this.t(name + '_hint') }
        htmlFor={ name }
        className={ constructor.name + "__" + name }
        key={ 'fieldset' + name }
        labelTop={ true }>
          { children }
      </FormRow>
    );
  },

  textInput: function(name, options) {
    options = options || { hint: true };
    var input = (
          <TextInput
            className={ name }
            errors={ this.props.errors && this.props.errors[name] }
            id={ name }
            onBlur={ options.onBlurCallback }
            onChange={ this.inputChangeEventFn(name) }
            readOnly={ options.readOnly }
            value={ this.state.form[name] } />
        );

    return this.formRow(input, name, !options.hint);
  }
};
