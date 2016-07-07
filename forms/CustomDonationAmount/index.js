'use strict'

import React from 'react'

const CustomDonationAmount = ({
  handleChanged,
  customDonation
}) => {
  return (
    <li
      className='string required'
      id='donation_donation_builder_defined_amount_input'
    >
      <label for='donation_donation_builder_defined_amount'>Other amount</label>
      <span className='custom-donation currency-symbol'>{customDonation.currency.symbol}</span>
      <input
        className='surcharge-input'
        id='donation_donation_builder_defined_amount'
        name='defined_amount'
        size='30'
        type='number'
        value={customDonation.cents > 0 ? customDonation.cents / 100 : ''}
        onChange={function (event) {
          const centsValue = parseFloat(event.target.value) * 100
          handleChanged(centsValue, customDonation.currency.symbol)
        }}
      />
    </li>
  )
}

CustomDonationAmount.propTypes = {
  handleChanged: React.PropTypes.func.isRequired,
  customDonation: React.PropTypes.object.isRequired
}

CustomDonationAmount.defaultProps = {
  customDonation: {
    cents: 0,
    currency: {
      symbol: '$'
    }
  }
}

export default CustomDonationAmount
