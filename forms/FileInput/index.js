"use strict";

var React       = require('react');
var classNames  = require('classnames');
var filepicker  = require('../../lib/filepicker');
var Icon        = require('../../Helpers/Icon');
var InputErrors = require('../InputErrors');

module.exports = React.createClass({
  displayName: 'FileInput',

  propTypes: {
    id: React.PropTypes.string,
    noFileLabel: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      mimetypes: ['image/*']
    };
  },

  browse: function(e) {
    var props = this.props;
    var options = {
      mimetypes: props.mimetypes
    };

    if (props.services) {
      options.services = props.services;
    }

    e.preventDefault();
    filepicker.pick(options, this.onChange);
  },

  reset: function(e) {
    e.preventDefault();
    this.onChange({
      url: null,
      filename: null
    });
  },

  onBlur: function() {
    var onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur();
    }
  },

  onChange: function(file) {
    var onChange = this.props.onChange;

    this.refs.browse_files.getDOMNode().focus();

    if (onChange) {
      onChange(file);
    }
  },

  getBrowseLabel: function(filename) {
    return filename ? "Replace" : "Browse";
  },

  render: function() {
    var props       = this.props;
    var file        = props.value;
    var filename    = file ? file.filename : null;
    var inputLabel  = filename ? filename : props.noFileLabel;
    var browseLabel = this.getBrowseLabel(filename);
    var classes, resetButton;

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

    classes = classNames({
      'hui-FileInput_hasFile': !!filename
    }, 'hui-FileInput');

    return (
      <span>
        <span className={ classes } >
          <span className="hui-FileInput__input" id={ props.id } onClick={ this.browse }>{ inputLabel }</span>
          <span className="hui-FileInput__buttons">
            { resetButton }
            <a href="#" ref="browse_files" onBlur={ this.onBlur } className="hui-FileInput__browse" onClick={ this.browse }>{ browseLabel }</a>
          </span>
        </span>
        <InputErrors errors={ props.errors } />
      </span>
    );
  },
});
