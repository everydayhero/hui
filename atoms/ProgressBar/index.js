'use strict'

import React from 'react'

module.exports = React.createClass({
  displayName: 'ProgressBar',

  propTypes: {
    progress: React.PropTypes.number,
    goal: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      progress: 0,
      goal: 0
    }
  },

  render: function() {
    let props = this.props
    let width = props.progress && props.goal ? (props.progress / props.goal * 100) : 0
    let progressStyles = {
      width: ((width <= 100) ? width : 100) + '%'
    }

    return (
      <div className="hui-ProgressBar">
        <div className="hui-ProgressBar__progress" style={ progressStyles }></div>
      </div>
    )
  }
})
