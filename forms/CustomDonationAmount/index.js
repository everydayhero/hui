import React from 'react'

const CustomDonationAmount = ({
  handleChanged,
  amount,
  selected,
  currency
}) => (
  <li
    className='string required'
    id='donation_donation_builder_defined_amount_input'
  >
    <label for='donation_donation_builder_defined_amount'>Other amount</label>
    <span className='custom-donation currency-symbol'>{currency.symbol}</span>
    <input
      className='surcharge-input'
      id='donation_donation_builder_defined_amount'
      name='defined_amount'
      type='number'
      value={amount > 0 ? amount / 100 : ''}
      onChange={function (event) {
        const centsValue = parseFloat(event.target.value) * 100
        try {
          handleChanged(centsValue)
        } catch (e) {}
      }}
    />
  </li>
)

CustomDonationAmount.propTypes = {
  handleChanged: React.PropTypes.func.isRequired,
  amount: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
  currency: React.PropTypes.shape({
    symbol: React.PropTypes.oneOf(['$', '£', '€'])
  })
}

CustomDonationAmount.defaultProps = {
  currency: {
    symbol: '$'
  },
  selected: false,
  amount: 0
}

export default CustomDonationAmount
