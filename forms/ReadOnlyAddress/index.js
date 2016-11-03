'use strict'

import React from 'react'
import TextInput from '../TextInput'
import _ from 'lodash'

export default React.createClass({
  displayName: 'ReadOnlyAddress',

  propTypes: {
    value: React.PropTypes.shape({
      street_address: React.PropTypes.string,
      street_address_2: React.PropTypes.string,
      locality: React.PropTypes.string,
      region: React.PropTypes.string,
      postal_code: React.PropTypes.string,
      country_name: React.PropTypes.string
    }).isRequired
  },

  render: function () {
    var props = this.props
    var address = props.value || {}
    var fields = _.compact([
      address.street_address,
      address.street_address_2,
      address.locality,
      address.region,
      address.postal_code,
      address.country_name
    ])

    return (
      <TextInput
        {...props}
        readOnly
        value={fields.join(', ')} />
    )
  }
})
