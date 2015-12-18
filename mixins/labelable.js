import React from 'react'

export default {
  renderLabel (displayName) {
    const {
      label,
      id
    } = this.props

    if (label === null) return null

    return (
      <label
        ref="label"
        htmlFor={ id }
        className={ `hui-${ displayName }__label` }>
        { label }
      </label>
    )
  }
}
