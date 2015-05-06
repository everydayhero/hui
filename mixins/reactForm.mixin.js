"use strict";

var React               = require('react');
var FormRow             = require('../forms/FormRow');
var TextInput           = require('../forms/TextInput');
var ReadOnlyAddress     = require('../forms/ReadOnlyAddress');
var CheckBox            = require('../forms/Checkbox');
var TextArea            = require('../forms/TextArea');
var UrlInput            = require('../forms/UrlInput');
var DateInput           = require('../forms/DateInput');
var FileInput           = require('../forms/FileInput');
var ImageInput          = require('../forms/ImageInput');
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
    return function(value) {
      var form = this.state.form;

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

      form[key] = nullEmptyStringDeep(obj);
      this.setState({form: form}, this.onChange);
    }.bind(this);
  },

  formRow: function(children, name, options) {
    var constructor = this.constructor || {};
    var hint;
    options = options || {};

    if (!options.hint) {
      hint = undefined;
    } else if(typeof options.hint == 'boolean') {
      hint = this.t(name + '_hint');
    } else {
      hint = options.hint;
    }

    return (
      <FormRow
        label={ this.t(name + '_label') }
        hint={ hint }
        htmlFor={ name }
        className={ constructor.name + "__" + name }
        key={ 'fieldset' + name }
        labelTop={ true }>
          { children }
      </FormRow>
    );
  },

  readOnlyAddress: function(name, options) {
    var input;
    options = options || { hint: true };

    input = (
      <ReadOnlyAddress
        id={ name }
        value={ this.state.form[name] }
        onChange={  this.inputChangeEventFn(name) }
        className={ name } />
    );

    return this.formRow(input, name, options);
  },

  textInput: function(name, options) {
    var input;
    options = options || { hint: true };

    input = (
      <TextInput
        className={ name }
        errors={ this.props.errors && this.props.errors[name] }
        id={ name }
        onBlur={ options.onBlurCallback }
        onChange={ this.inputChangeEventFn(name) }
        readOnly={ options.readOnly }
        value={ this.state.form[name] }
        hasCounter={ options.hasCounter }
        maxLength={ options.maxLength } />
    );

    return this.formRow(input, name, options);
  },

  checkboxInput: function(name) {
    return (
      <CheckBox
        id={ name }
        value={ this.state.form[name] }
        label={ this.t( name + '_label') }
        onChange={ this.inputChangeEventFn(name) }
        key={ name }/>
    );
  },

  textArea: function(name, options) {
    var textArea;
    options = options || { hint: true };

    textArea = (
      <TextArea
        id={ name }
        value={ this.state.form[name] }
        onChange={ this.inputChangeEventFn(name)  }
        errors={ this.props.errors && this.props.errors[name]}
        key={ name }/>
    );

    return this.formRow(textArea, name, options);
  },

  urlInput: function(name, placeholder) {
    var input = (
          <UrlInput
            id={ name }
            onChange={ this.changeFormPropertyFn(name) }
            value={ this.state.form[name] }
            placeholder={ placeholder }
            errors={ this.props.errors && this.props.errors[name] } />
        );

    return this.formRow(input, name);
  },

  dateInput: function(name, placeholder, options) {
    var input;

    options = options || { hint: true };
    input = (
      <DateInput
        id={ name }
        value={ this.state.form[name] }
        onChange={ this.inputChangeEventFn(name) }
        placeholder={ placeholder }
        errors={ this.props.errors && this.props.errors[name] } />
    );

    return this.formRow(input, name, options);
  },

  fileInput: function(name, options) {
    var input;
    options = options || { hint: true };

    input = (
          <FileInput
            id={ name }
            onChange={ this.changeFormPropertyFn(name) }
            value={ this.state.form[name] }
            errors={ this.props.errors && this.props.errors[name] } />
        );

    return this.formRow(input, name, options);
  },

  imageInput: function(name, options) {
    var errors = this.props.errors;
    var input;

    options = options || { hint: true };
    input = (
      <ImageInput
        id={ name }
        value={ this.state.form[name] }
        onChange={ this.changeFormPropertyFn(name) }
        errors={ errors && errors[name] } />
    );

    return this.formRow(input, name, options);
  },
};
