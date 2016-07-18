/*
 * TODO Comment
 * This is only used for HUI demos. Not used external to this project
 */
import React from 'react'

import DonationAmount from '../DonationAmount'
import CustomDonationAmount from '../CustomDonationAmount'

const DonationAmountsList = ({
  donationAmounts,
  currency,
  handleCustomAmountChanged,
  handleDonationOptionSelected
}) => (
  <ol>
    <li
      id="donation_donation_builder_predefined_amount_input"
      className="radio optional"
    >
      {donationAmounts.map((option, i) => (
        <DonationAmount
          amount={option.amount}
          currency={currency}
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
      amount: React.PropTypes.number.isRequired,
      isSelected: React.PropTypes.bool
    })
  ).isRequired,
  currency: React.PropTypes.shape({
    symbol: React.PropTypes.oneOf(['£', '$', '€'])
  }),
  handleCustomAmountChanged: React.PropTypes.func.isRequired,
  handleDonationOptionSelected: React.PropTypes.func.isRequired
}

export default DonationAmountsList
