'use strict'

import React from 'react'
import Icon from '../../../atoms/Icon'
import classnames from 'classnames'
import labelable from '../../../mixins/labelable'

export default React.createClass({
  displayName: 'FilterSelectDisplay',

  mixins: [labelable],

  propTypes: {
    label: React.PropTypes.string,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    displayProperty: React.PropTypes.string,
    selected: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      label: 'Selected option',
      spacing: 'compact',
      layout: 'full',
      displayProperty: 'label',
      selected: null
    }
  },

  render () {
    const {
      label,
      selected,
      displayProperty,
      spacing,
      layout
    } = this.props

    const classes = classnames([
      'hui-FilterSelectDisplay',
      'hui-FilterSelectDisplay--' + spacing,
      'hui-FilterSelectDisplay--' + layout,
      label === null && 'hui-FilterSelectDisplay--no-label'
    ])

    const valueClasses = classnames([
      'hui-FilterSelectDisplay__value',
      label === null && 'hui-FilterSelectDisplay__value--no-label'
    ])

    return (
      <div className={ classes }>
        <div className="hui-FilterSelectDisplay__wrap">
          { this.renderLabel('FilterSelectDisplay')  }
          <div className={ valueClasses }>
            { !!selected && selected[displayProperty] }
          </div>
          <Icon
            icon="chevron-down"
            className="hui-FilterSelectDisplay__icon" />
        </div>
      </div>
    )
  }
})
