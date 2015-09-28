'use strict';

import React from 'react'

export default React.createClass({
  displayName: 'Option',

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render () {
    return (
      <div
        ref="option"
        className={ `OptionListOption ${ this.props.className }` }>
        { this.props.label }
      </div>
    )
  }
})
