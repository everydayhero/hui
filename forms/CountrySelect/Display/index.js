'use strict'

import React from 'react'
import classnames from 'classnames'
import Icon from '../../../atoms/Icon'
import FlagIcon from '../../../atoms/FlagIcon'

export default React.createClass({
  displayName: 'CountrySelectDisplay',

  propTypes: {
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    selected: React.PropTypes.object,
    openFilter: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      spacing: 'compact',
      layout: 'full',
      selected: null,
      openFilter: () => {}
    }
  },

  render () {
    let props = this.props
    let selected = props.selected

    let classes = classnames([
      'hui-CountrySelectDisplay',
      'hui-CountrySelectDisplay--' + this.props.spacing,
      'hui-CountrySelectDisplay--' + this.props.layout
    ])

    return (
      <div className={ classes }>
        <button
          className="hui-CountrySelectDisplay__wrap"
          onClick={ this.props.openFilter }>
          <FlagIcon
            className="hui-CountrySelectDisplay__flag-icon"
            country={ (!!selected && selected.value) } />
          <span className="hui-CountrySelectDisplay__value">
            { !!selected && selected.value }
          </span>
          <Icon className="hui-CountrySelectDisplay__icon" icon="caret-down" />
        </button>
      </div>
    )
  }
})
