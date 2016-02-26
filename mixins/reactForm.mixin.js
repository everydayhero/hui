'use strict'

import React from 'react'
import FormRow from '../forms/FormRow'
import nullEmptyStringDeep from '../lib/nullEmptyStringDeep'

import TextInput from '../forms/TextInput'
import TextCountDownInput from '../forms/TextCountDownInput'
import ReadOnlyAddress from '../forms/ReadOnlyAddress'
import CheckBox from '../forms/Checkbox'
import TextArea from '../forms/TextArea'
import UrlInput from '../forms/UrlInput'
import DateInput from '../forms/DateInput'
import FileInput from '../forms/FileInput'
import ImageInput from '../forms/ImageInput'
import SelectInput from '../forms/SelectInput'
import DateSelect from '../forms/DateSelect'
import SearchInput from '../forms/SearchInput'

var inputs = {
  TextInput,
  TextCountDownInput,
  ReadOnlyAddress,
  CheckBox,
  TextArea,
  UrlInput,
  DateInput,
  FileInput,
  ImageInput,
  SelectInput,
  DateSelect,
  SearchInput
};

var defaultMessage = { defaults: [{ message: '' }] };

module.exports = {
  getInitialState: function() {
    var form = {};
    if (this.initialiseForm) {
      this.initialiseForm(form);
    }

    return { form };
  },

  inputChangeEventFn: function(key) {
    return function(value) {
      var form = this.state.form;
      if (value === '') {
        value = null;
      }

      form[key] = value;
      this.setState({ form }, this.onChange);
    }.bind(this);
  },

  changeFormPropertyFn: function(key) {
    return function(obj) {
      var form = this.state.form;

      form[key] = nullEmptyStringDeep(obj);
      this.setState({ form }, this.onChange);
    }.bind(this);
  },

  formRow: function(children, name, options) {
    options = options || {};
    var tip = options.tip || this.t(name + '_tip', defaultMessage);

    return (
      <FormRow
        tip={ tip }
        htmlFor={ name }
        id={ 'FormRow__' + name }
        key={ 'fieldset' + name }
        labelTop={ true }>
          { children }
      </FormRow>
    );
  },

  renderInput: function(type, name, options) {
    var Input = inputs[type];
    var input;
    options = options || {};
    var label = options.label || this.t(name + '_label');
    var hint = options.hint || this.t(name + '_hint', defaultMessage);
    var errors = this.props.errors || {};

    input = (
      <Input
        label={ label }
        id={ name }
        value={ this.state.form[name] }
        hint={ hint }
        onChange={  this.inputChangeEventFn(name) }
        className={ name }
        layout="half"
        spacing="fitted"
        errors={ options.errors || errors[name] }
        {...options} />
    );

    return this.formRow(input, name, options);
  },

  readOnlyAddress: function(name, options) {
    return this.renderInput('ReadOnlyAddress', name, options);
  },

  textInput: function(name, options) {
    return this.renderInput('TextInput', name, options);
  },

  textCountDownInput: function(name, options) {
    return this.renderInput('TextCountDownInput', name, options);
  },

  checkboxInput: function(name, options) {
    return this.renderInput('CheckBox', name, options);
  },

  selectInput: function(name, options) {
    return this.renderInput('SelectInput', name, options);
  },

  searchInput: function(name, options) {
    return this.renderInput('SearchInput', name, options);
  },

  textArea: function(name, options) {
    return this.renderInput('TextArea', name, options);
  },

  urlInput: function(name, options) {
    return this.renderInput('UrlInput', name, options);
  },

  dateSelect: function(name, options) {
    return this.renderInput('DateSelect', name, options);
  },

  dateInput: function(name, options) {
    options = options || {};
    if (!options.layout) {
      options.layout = 'quarter';
    }
    return this.renderInput('DateInput', name, options);
  },

  fileInput: function(name, options) {
    return this.renderInput('FileInput', name, options);
  },

  imageInput: function(name, options) {
    return this.renderInput('ImageInput', name, options);
  }
};
