'use strict'

import React from 'react'
import CopyInput from '../../../forms/CopyInput'

export default React.createClass({
  displayName: 'CopyInputExample',

  render() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="CopyInput">CopyInput</h3>
        <CopyInput value="http://everydayhero.com/" />
      </div>
    )
  }
})
