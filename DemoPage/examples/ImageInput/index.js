'use strict'

import React      from 'react'
import ImageInput from '../../../forms/ImageInput'
import formMixin  from '../../../mixins/reactForm.mixin'

export default React.createClass({
  displayName: 'ImageInputExample',

  mixins: [formMixin],

  t: function(name) {
    var translation = {
      'banner_image_label': 'Banner Image:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.changeFormPropertyFn;

    return (
    <div>
      <h3 className="DemoPage__h3" id="ImageInput">ImageInput</h3>
      <ImageInput
        id={ 'proof_image' }
        value={ this.state.form.proof_image }
        onChange={ change('proof_image') }
        options={ { imageMin: [800, 600], imageQuality: 80, cropRatio: 8 / 6 } } />
    </div>
    );
  }
});
