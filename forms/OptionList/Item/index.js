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
    shouldFocus: React.PropTypes.bool,
    shouldScroll: React.PropTypes.bool,
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
      shouldFocus: false,
      shouldScroll: false,
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
    let {
      option,
      isSelected,
      isCandidate,
      isHighlighted,
      shouldFocus
    } = this.props
    return (
      nextProps.option.id     !== option.id     ||
      nextProps.isSelected    !== isSelected    ||
      nextProps.isHighlighted !== isHighlighted ||
      nextProps.isCandidate   !== isCandidate   ||
      nextProps.shouldFocus   !== shouldFocus
    )
  },

  componentDidUpdate () {
    let { shouldFocus, isCandidate, shouldScroll } = this.props

    if (shouldFocus) {
      this.focus()
    } else if (!shouldFocus && shouldScroll && isCandidate) {
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
      isHighlighted,
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
          autoFocus={ this.props.shouldFocus }
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
            isHighlighted={ isHighlighted }
            isSelected={ isSelected }
            isCandidate={ isCandidate }
            label={ option[labelKey] }
            value={ option[valueKey] }  />
        </label>
      </li>
    )
  }
})
