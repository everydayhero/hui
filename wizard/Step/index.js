'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'Step',

  render: function () {
    return (
      <div className='hui-Step'>
        { this.props.children }
      </div>
    )
  }
})
