import React from 'react'

const CustomDonationAmount = ({
  handleChanged
}) => {
  return (
    <li
      className='string required'
      id='donation_donation_builder_defined_amount_input'
    >
      <label for='donation_donation_builder_defined_amount'>Other amount</label>
      <input
        className='surcharge-input'
        id='donation_donation_builder_defined_amount'
        name='defined_amount'
        size='30'
        type='number'
        onChange={function(event) {
          handleChanged(event.target.value)
        }}
      />
    </li>
  )
}

CustomDonationAmount.propTypes = {
  handleChanged: React.PropTypes.func.isRequired
}

export default CustomDonationAmount

