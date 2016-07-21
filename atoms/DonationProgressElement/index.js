import React from 'react'

const DonationProgressElement = (props) => {
  const { totalAmount, elementAmount, offsetAmount } = props
  const widthRatio = elementAmount / totalAmount * 100
  const width = `${widthRatio}%`
  const style = { width }

  if (offsetAmount) {
    const offsetRatio = offsetAmount / totalAmount * 100
    style.left = `${offsetRatio}%`
  }

  return (
    <div
      style={style}
      {...props}
    />
  )
}

export default DonationProgressElement
