'use strict'

import React from 'react'
import _ from 'lodash'

export default React.createClass({
  displayName: 'LoadingProgress',

  style: function () {
    var style
    if (this.refs.bar && !this.props.inProgress) {
      style = { width: this.refs.bar.offsetWidth || '100%' }
    }

    return style
  },

  shouldComponentUpdate: function (newProps) {
    return (!!this.props.inProgress) !== (!!newProps.inProgress)
  },

  render: function () {
    var classes = _.compact([
      'hui-LoadingProgress__bar',
      this.props.inProgress && '--inProgress'
    ]).join('')

    return (
      <div className='hui-LoadingProgress'>
        <div className={classes} ref='bar' style={this.style()} />
      </div>
    )
  }
})
