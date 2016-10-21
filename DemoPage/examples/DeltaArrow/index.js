'use strict'

import React from 'react'
import DeltaArrow from '../../../graphs/DeltaArrow'

export default React.createClass({
  displayName: 'DeltaArrowExample',

  render: function () {
    var n = null

    return (
      <div>
        <h3 className='DemoPage__h3' id='DeltaArrow'>DeltaArrow</h3>
        <div className='DemoPage__example--deltaarrow--stacked'>
          <DeltaArrow delta={0.5} />
          <DeltaArrow delta={-0.5} />
          <DeltaArrow delta={n} />
          <DeltaArrow delta={n} loading />
        </div>
      </div>
    )
  }
})
