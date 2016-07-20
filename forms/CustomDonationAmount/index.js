import React from 'react'
import classNames from 'classnames'

const CustomDonationAmount = ({
  handleChanged,
  handleFocused,
  amount,
  selected,
  currency
}) => (
  <li
    className='donation-preset'
  >
    <div
      id="donation_donation_builder_defined_amount_input"
      className={classNames({
        'donation-preset-amount-label': true,
        selected
      })}
    >
      <label htmlFor='donation_donation_builder_defined_amount'>Other amount:</label>
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
        onFocus={function () { handleFocused() }}
      />
    </div>
  </li>
)

CustomDonationAmount.propTypes = {
  handleChanged: React.PropTypes.func.isRequired,
  handleFocused: React.PropTypes.func,
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
