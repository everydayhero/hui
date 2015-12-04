'use strict';

import React from 'react'
import classnames from 'classnames'
import find from 'lodash/collection/find'
import debounce from 'lodash/function/debounce'
import Item from './Item'
import DefaultDisplay from './DefaultDisplay'

export default React.createClass({
  displayName: 'OptionList',

  propTypes: {
    options: React.PropTypes.array.isRequired,
    valueKey: React.PropTypes.string,
    labelKey: React.PropTypes.string,
    highlightedKey: React.PropTypes.string,
    highlightedValue: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    Display: React.PropTypes.func,
    emptyLabel: React.PropTypes.string,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      Display: DefaultDisplay,
      valueKey: 'value',
      labelKey: 'label',
      onBlur: () => {},
      onFocus: () => {},
      onSelection: () => {},
      emptyLabel: 'No options to display',
      layout: 'full',
      spacing: 'loose'
    }
  },

  getInitialState () {
    return {
      shouldScroll: true,
      selected: this.props.selectedOption,
      selectionCandidate: this.props.selectedOption || this.props.options[0]
    }
  },

  componentWillReceiveProps (nextProps) {
    let { selectedOption } = nextProps
    let { valueKey } = this.props
    let { selected } = this.state
    var newState = { focused: false }
    if (selectedOption && (!selected || (selectedOption[valueKey] !== selected[valueKey]))) {
      newState = {
        ...newState,
        shouldScroll: true,
        selected: selectedOption,
        selectionCandidate: selectedOption
      }
    } else if (selectedOption === null) {
      newState = {
        ...newState,
        shouldScroll: false,
        selected: null
      }
    }
    this.setState(newState)
  },

  setScroll (pos) {
    this.refs.scrollContainer.getDOMNode().scrollTop = pos
  },

  setSelected (option) {
    this.setState({
      shouldScroll: false,
      selectionCandidate: option,
      selected: option
    }, () => {
      this.props.onSelection(option)
    })
  },

  setSelectionCandidate (option) {
    this.setState({
      selectionCandidate: option,
      focused: true
    })
  },

  getVisibleCandidate () {
    const { selectionCandidate } = this.state
    const { options, valueKey } = this.props

    if (!selectionCandidate) return false

    return find(options, (option) => {
      return option[valueKey] === selectionCandidate[valueKey]
    })
  },

  keyHandlers: {
    9() {
      this.setSelected(this.state.selected)
    },
    13(e) {
      e.preventDefault()
      this.setSelected(this.state.selectionCandidate)
    },
    32(e) {
      e.preventDefault()
      this.setSelected(this.state.selectionCandidate)
    },
    40(e, index) {
      e.preventDefault()
      let options = this.props.options
      let newIndex = index + 1 === options.length ? 0 : index + 1
      let option = options[newIndex]
      this.setSelectionCandidate(option)
    },
    38(e, index) {
      e.preventDefault()
      let options = this.props.options
      let newIndex = index === 0 ? options.length - 1 : index - 1
      let option = options[newIndex]
      this.setSelectionCandidate(option)
    }
  },

  handleOptionKeyDown (e) {
    let key = e.keyCode || e.which
    let options = this.props.options
    let visibleCandidate = this.getVisibleCandidate()
    let index = options.indexOf(visibleCandidate)

    if (this.keyHandlers[key]) {
      this.keyHandlers[key].call(this, e, index)
    }
  },

  isCandidate(option) {
    let { selectionCandidate } = this.state
    let { valueKey } = this.props

    return selectionCandidate && (option[valueKey] === selectionCandidate[valueKey])
  },

  isSelected(option) {
    let { selected } = this.state
    let { valueKey } = this.props

    return !!selected && (option[valueKey] === selected[valueKey])
  },

  isHighlighted(option) {
    let { highlightedKey, highlightedValue } = this.props

    return !!highlightedValue && (option[highlightedKey] === highlightedValue)
  },

  handleOptionChange(option) {
    this.setSelected(option)
  },

  handleOptionMouseOver(option) {
    this.setSelectionCandidate(option)
  },

  focus() {
    this.setState({
      focused: true
    })
  },

  setFocus: debounce(function (value) {
    const { onFocus, onBlur } = this.props
    this.setState({
      focused: value
    }, () => {
      value ? onFocus() : onBlur()
    })
  }, 100),

  handleBlur() {
    this.setFocus(false)
  },

  handleFocus() {
    this.setFocus(true)
  },

  renderOptions() {
    let {
      Display,
      valueKey,
      labelKey
    } = this.props

    return this.props.options.map((option, index) => {
      let isCandidate = this.isCandidate(option)
      let { focused, shouldScroll } = this.state
      return (
        <Item
          ref={ `option-list-item-${ index }` }
          key={ `option-list-item-${ index }` }
          Display={ Display }
          option={ option }
          valueKey={ valueKey }
          labelKey={ labelKey }
          shouldScroll={ shouldScroll }
          shouldFocus={ focused && isCandidate }
          isHighlighted={ this.isHighlighted(option) }
          isCandidate={ isCandidate }
          isSelected={ this.isSelected(option) }
          onChange={ this.handleOptionChange }
          onMouseOver={ this.handleOptionMouseOver }
          onKeyDown={ this.handleOptionKeyDown }
          setScroll={ this.setScroll } />
      )
    })
  },

  renderEmptyState() {
    return (
      <li>
        <em className="hui-OptionListDisplay hui-OptionListDisplay--empty">
          { this.props.emptyLabel }
        </em>
      </li>
    )
  },

  render() {
    let classes = classnames([
      this.props.className,
      'hui-OptionList--' + this.props.layout,
      'hui-OptionList--' + this.props.spacing,
      'hui-OptionList'
    ])
    return (
      <div
        className={ classes }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }>
        <div ref="scrollContainer" className="hui-OptionList__scroll-container">
          <ul className="hui-OptionList__list">
            { this.props.options.length ? this.renderOptions() : this.renderEmptyState() }
          </ul>
        </div>
      </div>
    )
  }
})
