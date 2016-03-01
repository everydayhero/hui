'use strict'

import React       from 'react'
import AvaratInput from '../../../forms/AvatarInput'
import formMixin   from '../../../mixins/reactForm.mixin'

export default React.createClass({
  displayName: 'AvaratInputExample',
  mixins: [formMixin],

  render: function() {
    var change = this.changeFormPropertyFn;

    return (
    <div>
      <h3 className="DemoPage__h3" id="AvatarInput">AvaratInput</h3>
      <AvaratInput
        id={ 'sample_file' }
        onChange={ change('sample_file') }
        pageName="Page Name"
        value={ this.state.form.sample_file } />
    </div>
    );
  }
});
