'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'Tag',

  render() {
    return (
      <div className="hui-Tag">
        <div className="hui-Tag__label">
          { this.props.children }
        </div>
      </div>
    )
  }
})
