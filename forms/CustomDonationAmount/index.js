'use strict'

import React from 'react'

const CustomDonationAmount = ({
  handleChanged,
  amount,
  currency
}) => {
  return (
    <span
      className='string required'
      id='donation_donation_builder_defined_amount_input'
    >
      <label for='donation_donation_builder_defined_amount'>Other amount</label>
      <span className='custom-donation currency-symbol'>{currency.symbol}</span>
      <input
        className='surcharge-input'
        id='donation_donation_builder_defined_amount'
        name='defined_amount'
        size='30'
        type='number'
        value={amount > 0 ? amount / 100 : ''}
        onChange={function (event) {
          const centsValue = parseFloat(event.target.value) * 100
          handleChanged(centsValue, currency.symbol)
        }}
      />
    </span>
  )
}

CustomDonationAmount.propTypes = {
  handleChanged: React.PropTypes.func.isRequired,
  amount: React.PropTypes.number.isRequired,
  currency: React.PropTypes.shape({
    symbol: React.PropTypes.oneOf(['$', '£', '€'])
  })
}

CustomDonationAmount.defaultProps = {
  currency: {
    symbol: '$'
  },
  amount: 0
}

export default CustomDonationAmount
