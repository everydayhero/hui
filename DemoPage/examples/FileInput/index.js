"use strict";

var React     = require('react');
var FileInput = require('../../../forms/FileInput');
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
      <h3 className="DemoPage__h3" id="FileInput">FileInput</h3>

      { this.fileInput("image") }

      <FileInput
        id={ 'sample_file' }
        noFileLabel={ 'No file selected' }
        label={ 'image with crop'}
        onChange={ change('sample_file') }
        value={ this.state.form.sample_file }
        options={ {imageDim: [800, 600], imageQuality: 80, cropRatio: 4/3 } } />

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
    </div>
    );
  }
});
