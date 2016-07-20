import React from 'react'

import numeric from '../../lib/numeric'

const DonationAmount = ({
  amount,
  currency,
  selected,
  handleSelected
}) => {
  const id = `donation_donation_builder_predefined_amount_${amount.cents}`
  return (
    <label for={id}>
      <input
        id={id}
        className='surcharge-input'
        name='predefined_amount'
        type='radio'
        value={amount}
        checked={selected}
        onChange={handleSelected}
      />
      {numeric.money(currency.symbol, amount, '0,0')}
    </label>
  )
}

DonationAmount.propTypes = {
  amount: React.PropTypes.number.isRequired,
  currency: React.PropTypes.shape({
    symbol: React.PropTypes.string
  }),
  selected: React.PropTypes.bool,
  handleSelected: React.PropTypes.func.isRequired
}

export default DonationAmount
