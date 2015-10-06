'use strict'

import React from 'react'
import Icon from '../../../atoms/Icon'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'FilterSelectDisplay',

  propTypes: {
    label: React.PropTypes.string,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    selected: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      label: 'Selected option',
      spacing: 'compact',
      layout: 'full',
      selected: null
    }
  },

  render () {
    let props = this.props
    let selected = props.selected

    let classes = classnames([
      'hui-FilterSelectDisplay',
      'hui-FilterSelectDisplay--' + props.spacing,
      'hui-FilterSelectDisplay--' + props.layout
    ])

    return (
      <div className={ classes }>
        <div className="hui-FilterSelectDisplay__wrap">
          <label className="hui-FilterSelectDisplay__label">
            { props.label }
          </label>
          <div className="hui-FilterSelectDisplay__value">
            { !!selected && selected.label }
          </div>
          <Icon
            icon="chevron-down"
            className="hui-FilterSelectDisplay__icon" />
        </div>
      </div>
    )
  }
})
