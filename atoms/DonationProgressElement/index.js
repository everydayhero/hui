import React from 'react'

const DonationProgressElement = (props) => {
  const { totalAmount, elementAmount } = props
  const ratio = elementAmount / totalAmount
  const width = `${ratio * 100}%`
  return (
    <div
      style={{width}}
      {...props}
    />
  )
}

export default DonationProgressElement
