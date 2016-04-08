'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
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
    onSelection: React.PropTypes.func,
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
      onSelection: () => {},
      onMouseOver: () => {},
      onKeyDown: () => {},
      setScroll: () => {}
    }
  },

  componentDidMount () {
    let { isSelected } = this.props

    if (isSelected) {
      let scrollPos = ReactDOM.findDOMNode(this).offsetTop - 20
      this.props.setScroll(scrollPos)
    }
  },

  shouldComponentUpdate (nextProps) {
    let {
      option,
      isSelected,
      isCandidate,
      isHighlighted,
      shouldFocus,
      valueKey
    } = this.props
    return (
      nextProps.option[valueKey] !== option[valueKey] ||
      nextProps.isSelected       !== isSelected       ||
      nextProps.isHighlighted    !== isHighlighted    ||
      nextProps.isCandidate      !== isCandidate      ||
      nextProps.shouldFocus      !== shouldFocus
    )
  },

  componentDidUpdate () {
    let { shouldFocus, isCandidate, shouldScroll } = this.props

    if (shouldFocus) {
      this.refs.radio.getDOMNode().focus()
    } else if (!shouldFocus && shouldScroll && isCandidate) {
      let scrollPos = ReactDOM.findDOMNode(this).offsetTop - 20
      this.props.setScroll(scrollPos)
    }
  },

  handleSelection () {
    let { onSelection, option } = this.props
    this.down && onSelection(option)
  },

  focus () {
    this.refs.radio.focus()
  },

  handleDown () {
    this.down = true
  },

  handleMove () {
    this.down = false
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
          type="radio"
          ref="radio"
          id={ `option-list-item-${option[valueKey]}` }
          name={ `option-list-item-${option[valueKey]}` }
          className="hui-OptionListItem__radio--hidden"
          value={ option[valueKey] }
          checked={ isSelected }
          onBlur={ this.handleSelection }
          onKeyDown={ this.handleKeyDown }
          readOnly />

        <label
          ref="label"
          onMouseDown={ this.handleDown }
          onTouchStart={ this.handleDown }
          onTouchMove={ this.handleMove }
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
