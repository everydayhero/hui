import React from 'react'

import numeric from '../../lib/numeric'

const DonationAmount = ({
  amount,
  onClicked
}) => {
  const id = `donation_donation_builder_predefined_amount_${amount.cents}`
  return (
    <li>
      <label for={id}>
        <input
          id={id}
          className='surcharge-input'
          name='predefined_amount'
          type='radio'
          value={amount.cents}
          onClick={onClicked}
        />
        {numeric.money(amount.currency.symbol, amount.cents, '0')}
      </label>
    </li>
  )
}

DonationAmount.propTypes = {
  amount: React.PropTypes.shape({
    cents: React.PropTypes.number.isRequired,
    currency: React.PropTypes.shape({
      symbol: React.PropTypes.string
    })
  }).isRequired,
  onClicked: React.PropTypes.func.isRequired
}

export default DonationAmount

