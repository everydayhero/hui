import React from 'react'

import DonationProgressElement from '../DonationProgressElement'
import numeric from '../../lib/numeric'

const DonationProgressBar = (props) => {
  const targetLabel = getProgressLabel(props)
  const { currency, donationTarget, currentTotal, personalInfluence } = props
  const targetCurrency = numeric.money(currency.symbol, donationTarget, '0,0')

  return (
    <div className='donation-progress-container'>
      <div className='donation-progress-caption donation-progress-remaining'>
        {targetLabel}
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

const getProgressLabel = ({
  currentTotal,
  donationTarget,
  personalInfluence,
  currency,
  fundraiserName
}) => {
  const remaining = donationTarget - currentTotal - personalInfluence
  const remainingCurrency = numeric.money(currency.symbol, Math.abs(remaining), '0,0')
  if (remaining > 0) {
    return `${fundraiserName} has ${remainingCurrency} to go`
  } else if (remaining === 0) {
    return `Fantastic! ${fundraiserName} has met their goal`
  } else {
    return `Fantastic! ${fundraiserName} is ${remainingCurrency} past their goal`
  }
}

export default DonationProgressBar
