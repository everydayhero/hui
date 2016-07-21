import React from 'react'

import DonationProgressElement from '../DonationProgressElement'
import numeric from '../../lib/numeric'

const DonationProgressBar = ({
  fundraiserName,
  currency,
  donationTarget,
  currentTotal,
  personalInfluence
}) => {
  const remaining = donationTarget - currentTotal - personalInfluence
  const remainingCurrency = numeric.money(currency.symbol, remaining, '0,0')
  const targetCurrency = numeric.money(currency.symbol, donationTarget, '0,0')

  return (
    <div className='donation-progress-container'>
      <div className='donation-progress-caption donation-progress-remaining'>
        {`${fundraiserName} has ${remainingCurrency} to go`}
      </div>

      <div className='donation-progress background'>
        <DonationProgressElement
          className='donation-progress existing'
          totalAmount={donationTarget}
          elementAmount={currentTotal}
        />

        <DonationProgressElement
          className='donation-progress influence'
          totalAmount={donationTarget}
          elementAmount={personalInfluence}
          offsetAmount={currentTotal}
        />
      </div>

      <div className='donation-progress-caption donation-progress-target'>
        {`${targetCurrency} goal`}
      </div>
    </div>
  )
}

DonationProgressBar.propTypes = {
  fundraiserName: React.PropTypes.string,
  currency: React.PropTypes.shape({
    symbol: React.PropTypes.oneOf(['$', '£', '€'])
  }),
  donationTarget: React.PropTypes.number.isRequired,
  currentTotal: React.PropTypes.number.isRequired,
  personalInfluence: React.PropTypes.number
}

export default DonationProgressBar
