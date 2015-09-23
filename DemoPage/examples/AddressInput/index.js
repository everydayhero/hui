'use strict';

var React        = require('react');
var AddressInput = require('../../../forms/AddressInput');
var formMixin    = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'AddressInputExample',
  mixins: [formMixin],

  render: function() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="AddressInput">AddressInput</h3>
        <AddressInput/>
      </div>
    );
  }
});
