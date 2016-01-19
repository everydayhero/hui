'use strict'

import React from 'react'
import ToggleableOptionForm from '../../../forms/ToggleableOptionForm'

export default React.createClass({
  displayName: 'ToggleableOptionFormExample',

  render() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="ToggleableOptionForm">ToggleableOptionForm</h3>
        <ToggleableOptionForm
          url="https://everydayhero-staging.com/api/v2/notification_options"
          token="62d35e46ee366be584e7d6529dd22077c021677d2efe21f03739dd30b39d3723" />
      </div>
    )
  }
})
