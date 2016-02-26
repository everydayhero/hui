'use strict'

import React     from 'react'
import TextInput from '../TextInput'
import _         from 'lodash'

export default React.createClass({
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
