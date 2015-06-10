"use strict";

var React           = require('react');
var filepicker      = require('../../lib/filepicker');
var Icon            = require('../../Helpers/Icon');
var inputMessage    = require('../../mixins/inputMessage');
var classNamesArray = require('../../lib/classNamesArray');

module.exports = React.createClass({
  displayName: 'FileInput',

  mixins: [inputMessage,],

  propTypes: {
    id: React.PropTypes.string,
    noFileLabel: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object,
    errors: React.PropTypes.array,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    options: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      mimetypes: ['image/*'],
      options: {},
      errors: [],
      layout: 'full',
      spacing: 'loose',
      label: 'image',
      noFileLabel: 'No file selected',
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      hasError: false,
      focused: false
    };
  },

  browse: function(e) {
    var props = this.props;
    var options = props.options;

    options.mimetypes = options.mimetypes || props.mimetypes;

    e.preventDefault();
    if (!props.disabled) {
      filepicker.pick(options, this.onChange, this.focus);
    }
  },

  reset: function(e) {
    e.preventDefault();
    this.onChange({
      url: null,
      filename: null
    });
  },

  focus: function() {
    this.refs.browse_files.getDOMNode().focus();
  },

  onBlur: function() {
    var onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur();
    }
    this.setState({ focused: false });
  },

  onFocus: function() {
    var onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus();
    }
    this.setState({ focused: true });
  },

  onChange: function(file) {
    var onChange = this.props.onChange;
    if (onChange) {
      onChange(file);
    }
    this.focus();
  },

  getBrowseLabel: function(filename) {
    return filename ? "Replace" : "Browse";
  },

  render: function() {
    var props           = this.props;
    var state           = this.state;
    var file            = props.value;
    var filename        = file ? file.filename : null;
    var inputLabel      = filename ? filename : props.noFileLabel;
    var browseLabel     = this.getBrowseLabel(filename);
    var hasServerErrors = props.errors.length;
    var resetButton;
    var classes = classNamesArray([
      'hui-FileInput--' + props.layout,
      'hui-FileInput--' + props.spacing,
      !!filename && 'hui-FileInput--hasFile',
      this.shouldShowError() && 'hui-FileInput--error',
      props.disabled && 'hui-FileInput--disabled',
      state.focused && 'hui-FileInput--focused',
      "hui-FileInput"
    ]);

    global.ENV = global.ENV || {};

    if (global.ENV.TEST_MODE) {
      global.fileInputs = global.fileInputs || {};
      global.fileInputs[props.id] = this;
    }

    if (filename) {
      resetButton = (
        <a href="#" className="hui-FileInput__reset" onClick={ this.reset }>
          <Icon icon="times-circle" />
        </a>
      );
    }

    return (
      <div className={ classes } >
        <div className="hui-FileInput__wrap">
          <label className="hui-FileInput__label">{ props.label }</label>
          <div className="hui-FileInput__input" id={ props.id } onClick={ this.browse }>
            { inputLabel }
          </div>
          <div className="hui-FileInput__buttons">
            { resetButton }
            <a href="#" ref="browse_files" onBlur={ this.onBlur } onFocus={ this.onFocus } className="hui-FileInput__browse" onClick={ this.browse }>{ browseLabel }</a>
          </div>
        </div>
        { this.renderMessage(props.errorMessage || hasServerErrors || props.hint) }
      </div>
    );
  },
});
