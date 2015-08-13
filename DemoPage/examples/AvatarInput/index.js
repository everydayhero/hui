'use strict';

var React       = require('react');
var AvaratInput = require('../../../forms/AvatarInput');
var formMixin   = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
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
