"use strict";

var React     = require('react');
var FileInput = require('../../../forms/FileInput');
var Highlight = require('react-highlight');
var formMixin = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'FileInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      image_label: 'image',
      image_tip: 'Upload an image.'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.changeFormPropertyFn;

    return (
    <div>
      <h3>FileInput</h3>
      <p>File input.</p>
      <h4>FileInput propTypes</h4>
      <ul>
        <li>id:</li>
        <li>noFileLabel:</li>
        <li>value:</li>
        <li>onBlur:</li>
        <li>onChange:</li>
      </ul>
      { this.fileInput("image") }

      <FileInput
        id={ 'sample_file' }
        noFileLabel={ 'No file selected' }
        onChange={ change('sample_file') }
        value={ this.state.form.sample_file } />

      <FileInput
        id={ 'sample_file' }
        label="error input"
        noFileLabel={ 'No file selected' }
        onChange={ change('sample_file_01') }
        errors={ ["Your image suggests a lack of design ability"] }
        value={ this.state.form.sample_file_01 } />

      <FileInput
        id={ 'sample_file' }
        label="disabled input"
        noFileLabel={ 'No file selected' }
        onChange={ change('sample_file_02') }
        disabled={ true }
        value={ this.state.form.sample_file_02 } />

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.fileInput('identity_proof') }\n" }
        { '<FileInput\n' }
        { "  id={ 'sample_file' }\n" }
        { "  noFileLabel={ 'No file selected' }\n" }
        { "  onChange={ change('sample_file') }\n" }
        { '  value={ this.state.form.sample_file }\n' }
        { '  errors={ this.props.errors && this.props.errors.sample_file } />\n' }
      </Highlight>
    </div>
    );
  }
});
