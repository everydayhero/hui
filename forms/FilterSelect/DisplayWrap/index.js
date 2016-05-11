import React from 'react'

export default React.createClass({
  displayName: 'DisplayWrap',

  componentDidMount () {
    if (this.props.focused) {
      setTimeout(() => {
        this.refs.input.focus()
      })
    }
  },

  render () {
    const {
      options,
      id,
      label,
      name,
      selected,
      Display,
      displayProperty,
      valueKey,
      labelKey,
      onFocus,
      onBlur,
      onChange,
      onKeyDown,
      onMouseDown,
      onClick
    } = this.props

    return (
      <div className="hui-FilterSelect__display">
        <Display
          label={ label }
          selected={ selected }
          displayProperty={ displayProperty } />

        <select
          id={ id }
          ref="input"
          name={ name }
          value={ !!selected && selected[valueKey] }
          className="hui-FilterSelect__display-input"
          onFocus={ onFocus }
          onBlur={ onBlur }
          onChange={ onChange }
          onKeyDown={ onKeyDown }
          onMouseDown={ onMouseDown }
          onClick={ onClick }>

          { options.map((opt) => {
            return (
              <option
                key={ opt.value }
                value={ opt[valueKey] }
                label={ opt[labelKey] }>
                { opt[labelKey] }
              </option>
            )
          }) }
        </select>
      </div>
    )
  }
})
