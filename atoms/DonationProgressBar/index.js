import React from 'react'

import DonationProgressElement from '../DonationProgressElement'

const DonationProgressBar = ({
  donationTarget,
  currentTotal,
  personalInfluence
}) => (
  <div className='donation-progress container'>

    <DonationProgressElement
      className='donation-progress existing'
      totalAmount={donationTarget}
      elementAmount={currentTotal}
    />

    <DonationProgressElement
      className='donation-progress influence'
      totalAmount={donationTarget}
      elementAmount={personalInfluence}
    />
  </div>
)

export default DonationProgressBar
