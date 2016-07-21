import React from 'react'

const DonationProgressElement = (props) => {
  const { totalAmount, elementAmount, offsetAmount } = props

  const offsetRatio = offsetAmount / totalAmount * 100
  const remainingWidth = 100 - offsetRatio

  const widthRatio = elementAmount / totalAmount * 100

  const width = `${Math.min(remainingWidth, widthRatio)}%`
  const left = `${offsetRatio}%`
  const style = { width, left }

  return (
    <div
      style={style}
      {...props}
    />
  )
}

DonationProgressElement.propTypes = {
  totalAmount: React.PropTypes.number.isRequired,
  elementAmount: React.PropTypes.number.isRequired,
  offsetAmount: React.PropTypes.number
}

DonationProgressElement.defaultProps = {
  offsetAmount: 0
}

export default DonationProgressElement
