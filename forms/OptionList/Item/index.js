'use strict'

import React from 'react'
import DefaultDisplay from '../DefaultDisplay'

export default React.createClass({
  displayName: 'OptionListItem',

  propTypes: {
    option: React.PropTypes.object,
    Display: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
    isCandidate: React.PropTypes.bool,
    valueKey: React.PropTypes.string,
    labelKey: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    setScroll: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      option: {},
      Display: DefaultDisplay,
      isSelected: false,
      isCandidate: false,
      valueKey: 'value',
      labelKey: 'label',
      onChange: () => {},
      onMouseOver: () => {},
      onKeyDown: () => {},
      setScroll: () => {}
    }
  },

  componentDidMount () {
    let { isSelected } = this.props

    if (isSelected) {
      let scrollPos = this.getDOMNode().offsetTop - 20
      this.props.setScroll(scrollPos)
    }
  },

  shouldComponentUpdate (nextProps) {
    let { isSelected, isCandidate, isFocused } = this.props
    return (
      nextProps.isSelected  !== isSelected  ||
      nextProps.isCandidate !== isCandidate ||
      nextProps.isFocused   !== isFocused
    )
  },

  componentDidUpdate () {
    let { isFocused, isCandidate } = this.props

    if (isFocused) {
      this.focus()
    } else if (!isFocused && isCandidate) {
      let scrollPos = this.getDOMNode().offsetTop - 20
      this.props.setScroll(scrollPos)
    }
  },

  focus () {
    this.refs.radio.getDOMNode().focus()
  },

  handleChange (e) {
    let { onChange, option } = this.props

    if (e.target.checked) {
      onChange(option)
    }
  },

  handleMouseOver () {
    let { onMouseOver, option } = this.props

    onMouseOver(option)
  },

  handleKeyDown (e) {
    let { onKeyDown } = this.props

    onKeyDown(e)
  },

  render () {
    let {
      Display,
      isSelected,
      isCandidate,
      option,
      valueKey,
      labelKey
    } = this.props

    return (
      <li
        key={ option[valueKey] }
        className="hui-OptionListItem">
        <input
          autoFocus={ this.props.isFocused }
          type="radio"
          ref="radio"
          id={ `option-list-item-${option[valueKey]}` }
          className="hui-OptionListItem__radio--hidden"
          value={ option[valueKey] }
          checked={ isSelected }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
          name="selected-option" />

        <label
          onMouseOver={ this.handleMouseOver }
          className="hui-OptionListItem__radio-label"
          htmlFor={ `option-list-item-${option[valueKey]}` }>
          <Display
            { ...option }
            isSelected={ isSelected }
            isCandidate={ isCandidate }
            label={ option[labelKey] }
            value={ option[valueKey] }  />
        </label>
      </li>
    )
  }
})
