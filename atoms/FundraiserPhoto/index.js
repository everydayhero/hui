import React from 'react'

const FundraiserPhoto = (props) => (
  <div className='fundraiser-photo'>
    <img className='fundraiser-photo-image circle-border' {...props} />
  </div>
)

FundraiserPhoto.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  title: React.PropTypes.string
}

export default FundraiserPhoto
