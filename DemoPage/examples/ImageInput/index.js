"use strict";

var React      = require('react');
var ImageInput = require('../../../forms/ImageInput');
var Highlight  = require('react-highlight');
var formMixin  = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'ImageInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      banner_image_label: 'Banner Image:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.changeFormPropertyFn;

    return (
    <div>
      <h3>ImageInput</h3>
      <p>Image input.</p>
      <h4>ImageInput propTypes</h4>
      <ul>
        <li>errors:</li>
        <li>id:</li>
        <li>value:</li>
        <li>onChange:</li>
      </ul>
      <div className="DemoPage__example">
        { this.imageInput('banner_image') }
        <ImageInput
          id={ 'proof_image' }
          value={ this.state.form.proof_image }
          onChange={ change('proof_image') } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.imageInput('banner_image') }\n" }
        { '<ImageInput\n' }
        { "  id={ 'proof_image' }\n" }
        { '  value={ this.state.form.proof_image }\n' }
        { "  onChange={ change('proof_image') } />\n" }
      </Highlight>
    </div>
    );
  }
});
