'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'InputErrors',

  getDefaultProps () {
    return {
      errors: []
    }
  },

  render () {
    var errors = this.props.errors
    var errorsList = errors.map((error, i) => {
      return <li key={'error' + i}>{ error }</li>
    })

    return (
      <ul className='hui-InputErrors'>
        { errorsList }
      </ul>
    )
  }
})
