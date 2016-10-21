'use strict'

import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'OptionListDefaultDisplay',

  propTypes: {
    isCandidate: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render () {
    let {
      isCandidate,
      isSelected,
      label
    } = this.props

    let classes = classnames({
      'hui-OptionListDisplay': true,
      'hui-OptionListDisplay--candidate': isCandidate,
      'hui-OptionListDisplay--selected': isSelected
    })

    return (
      <div className={classes}>
        { label }
      </div>
    )
  }
})
