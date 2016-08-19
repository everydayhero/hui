import React from 'react'
import classNames from 'classnames'

import numeric from '../../lib/numeric'

const DonationAmount = ({
  amount,
  selected,
  handleSelected
}) => {
  const id = `donation_donation_builder_predefined_amount_${amount}`
  return (
    <li className='donation-preset'>
      <label
        htmlFor={id}
        className={classNames({
          'donation-preset-amount-label': true,
          selected
        })}
      >
        <input
          id={id}
          className='donation-preset-amount'
          name='predefined_amount'
          type='radio'
          value={amount}
          checked={selected}
          onChange={handleSelected}
        />
        {numeric.money('', amount, '0,0')}
      </label>
    </li>
  )
}

DonationAmount.propTypes = {
  amount: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
  handleSelected: React.PropTypes.func.isRequired
}

export default DonationAmount
