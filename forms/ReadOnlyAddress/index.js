'use strict';

var React     = require('react');
var TextInput = require('../TextInput');
var _         = require('lodash');

module.exports = React.createClass({
  displayName: 'ReadOnlyAddress',

  render: function() {
    var props = this.props;
    var address = props.value || {};
    var fields = _.compact([
      address.street_address,
      address.street_address_2,
      address.locality,
      address.region,
      address.postal_code,
      address.country_name
    ]);

    return (
      <TextInput
        {...props}
        readOnly
        value={ fields.join(', ') } />
    );
  }
});
