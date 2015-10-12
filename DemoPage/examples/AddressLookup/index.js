'use strict'

import React from 'react'
import AddressLookup from '../../../forms/AddressLookup'

export default React.createClass({
  displayName: 'AddressLookupExample',

  getInitialState () {
    return {
      address: {
        street_address: ''
      }
    }
  },

  handleChange (address) {
    this.setState({
      address
    })
  },

  render: function() {

    return (
      <div>
        <h3 className="DemoPage__h3" id="AddressLookup">AddressLookup</h3>

        <AddressLookup
          onChange={ this.handleChange }/>

        <p className="DemoPage__p">
          { this.state.address.street_address || 'No address selected' }
        </p>
      </div>
    )
  }
})
