/** @jsx React.DOM */
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
      identity_proof_label: 'Identity proof:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;

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
      <div className="DemoPage__example">
        { this.fileInput('identity_proof') }
        <FileInput
          id={ 'sample_file' }
          noFileLabel={ 'No file selected' }
          onChange={ change('sample_file') }
          value={ this.state.form.sample_file }
          errors={ this.props.errors && this.props.errors.sample_file } />
      </div>

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
