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
      totalAmount={donationTarget.cents}
      elementAmount={currentTotal.cents}
    />

    <DonationProgressElement
      className='donation-progress influence'
      totalAmount={donationTarget.cents}
      elementAmount={personalInfluence.cents}
    />
  </div>
)

export default DonationProgressBar
