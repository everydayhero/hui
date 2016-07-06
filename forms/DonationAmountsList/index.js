import React from 'react'

import DonationAmount from '../DonationAmount'
import CustomDonationAmount from '../CustomDonationAmount'

const DonationAmountsList = ({
  donationOptions,
  handleCustomAmountChanged,
  handleDonationOptionSelected
}) => (
  <ol>
    <li
      id="donation_donation_builder_predefined_amount_input"
      className="radio optional"
    >
      {donationOptions.map((option, i) => (
        <DonationAmount
          amount={option.amount}
          handleSelected={function () {
            handleDonationOptionSelected(i, option)
          }}
          isSelected={option.isSelected}
          key={i}
        />
      ))}
    </li>

    <li
      id="donation_donation_builder_defined_amount_input"
      className="string required"
    >
      <CustomDonationAmount handleChanged={handleCustomAmountChanged} />
    </li>
  </ol>
)

DonationAmountsList.propTypes = {
  donationAmounts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      amount: React.PropTypes.shape({
        cents: React.PropTypes.number.isRequired,
        currency: React.PropTypes.shape({
          symbol: React.PropTypes.oneOf(['£', '$', '€'])
        })
      }),
      isSelected: React.PropTypes.bool
    })
  ).isRequired,
  handleCustomAmountChange: React.PropTypes.func.isRequired,
  handleDonationOptionSelected: React.PropTypes.func.isRequired
}

export default DonationAmountsList
