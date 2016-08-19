'use strict'

import React     from 'react'
import DonationAmountsList from '../../../forms/DonationAmountsList'

const initialState = {
  donationAmounts: [
    { amount: 3000, isSelected: false },
    { amount: 5000, isSelected: true },
    { amount: 15000, isSelected: false },
  ],
  currency: { symbol: '$' },
  handleCustomAmountChanged: () => { console.log('Custom amount changed') },
  handleDonationOptionSelected: () => { console.log('Donation option selected') }

}

export default React.createClass({
  displayName: 'DonationAmountsListExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3" id="DonationAmountsList">Donation Amounts</h3>
      <DonationAmountsList {...initialState} />
    </div>
    );
  }
});
