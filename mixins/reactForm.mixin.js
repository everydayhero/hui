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

  readOnlyAddress: function(name, options) {
    options = options || { hint: true };
    var input = (
          <ReadOnlyAddress
            id={ name }
            value={ this.state.form[name] }
            onChange={  this.inputChangeEventFn(name) }
            className={ name } />
        );

    return this.formRow(input, name, !options.hint);
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
            value={ this.state.form[name] }
            hasCounter={ options.hasCounter }
            maxLength={ options.maxLength } />
        );

    return this.formRow(input, name, !options.hint);
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

  textArea: function(name) {
    var textArea = (
          <TextArea
            id={ name }
            value={ this.state.form[name] }
            onChange={ this.inputChangeEventFn(name)  }
            errors={ this.props.errors && this.props.errors[name]}
            key={ name }/>
        );

    return this.formRow(textArea, name);
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

  dateInput: function(name, placeholder) {
    var input = (
          <DateInput
            id={ name }
            value={ this.state.form[name] }
            onChange={ this.inputChangeEventFn(name) }
            placeholder={ placeholder }
            errors={ this.props.errors && this.props.errors[name] } />
        );

    return this.formRow(input, name);
  },

  fileInput: function(name) {
    var input = (
          <FileInput
            id={ name }
            onChange={ this.changeFormPropertyFn(name) }
            value={ this.state.form[name] }
            errors={ this.props.errors && this.props.errors[name] } />
        );

    return this.formRow(input, name);
  },

  imageInput: function(name) {
    var errors = this.props.errors;
    var input = (
          <ImageInput
            id={ name }
            value={ this.state.form[name] }
            onChange={ this.changeFormPropertyFn(name) }
            errors={ errors && errors[name] } />
        );

    return this.formRow(input, name);
  }
};
