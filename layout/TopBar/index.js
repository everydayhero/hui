'use strict'

import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'TopBar',

  propTypes: {
    children: React.PropTypes.node
  },

  render: function () {
    var className = classnames({
      'hui-TopBar--fixed': this.props.fixed
    }, 'hui-TopBar')

    return (
      <div className={className}>
        { this.props.children }
      </div>
    )
  }
})
