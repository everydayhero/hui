import React from 'react'

const FundraiserPhoto = (props) => (
  <div className='fundraiser-photo circle-border'>
    <img {...props} />
  </div>
)

FundraiserPhoto.propTypes = {
  href: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  title: React.PropTypes.string
}

export default FundraiserPhoto
