'use strict'

import React      from 'react'
import numeral    from 'numeral'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'SingleNumber',

  propTypes: {
    loading: React.PropTypes.bool,
    emptyState: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      format: '0.0a',
      loading: false,
      emptyState: false
    }
  },

  metricFormatted: function() {
    const props = this.props

    if (!props.loading && !props.emptyState) {
      return numeral(props.value).format(props.format)
    }
  },

  render: function() {
    const loading    = this.props.loading
    const emptyState = this.props.emptyState
    const className  = classnames({
      'hui-SingleNumber--loading': loading,
      'hui-SingleNumber--emptyState': emptyState
    }, 'hui-SingleNumber')

    return (
      <div className={ className }>
        <div className="hui-SingleNumber__metric">
          { this.metricFormatted() }
        </div>
      </div>
    )
  }
})
