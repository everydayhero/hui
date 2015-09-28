'use strict';

import React from 'react'
import cx from 'react/lib/cx'
import find from 'lodash/collection/find'
import Option from './Option'

export default React.createClass({
  displayName: 'OptionList',

  propTypes: {
    options: React.PropTypes.array.isRequired,
    Option: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      Option
    }
  },

  getInitialState () {
    return {
      selected: null,
      selectionCandidate: this.props.options[0]
    }
  },

  setSelected (option) {
    this.setState({
      selectionCandidate: option,
      selected: option
    })
  },

  setSelectionCandidate (option) {
    this.setState({
      selectionCandidate: option
    })
  },

  keyHandlers: {
    13: function (index, options) {
      let option = options[index]
      this.setSelected(option)
    },
    40: function (index, options) {
      let newIndex = index + 1 === options.length ? 0 : index + 1
      let option = options[newIndex]
      this.setSelectionCandidate(option)
    },
    38: function (index, options) {
      let newIndex = index === 0 ? options.length - 1 : index - 1
      let option = options[newIndex]
      this.setSelectionCandidate(option)
    }
  },

  handleKeyDown (e) {
    let key = e.keyCode || e.which
    let options = this.props.options
    let currentOption = find(options, (option) => {
      return option.value === this.state.selectionCandidate.value
    })
    let index = options.indexOf(currentOption)

    if (this.keyHandlers[key]) {
      e.preventDefault()
      this.keyHandlers[key].call(this, index, options)
    }
  },

  isCandidate(option) {
    return this.state.selectionCandidate && (option.value === this.state.selectionCandidate.value)
  },

  isSelected(option) {
    return this.state.selected && (option.value === this.state.selected.value)
  },

  renderOptions () {
    return this.props.options.map((option) => {
      let OptionClass = this.props.Option

      let classes = cx({
        'OptionListOption--candidate': this.isCandidate(option),
        'OptionListOption--selected': this.isSelected(option)
      })

      return (
        <li
          key={ option.value }
          onMouseEnter={ () => this.setSelectionCandidate(option) }
          onClick={ () => this.setSelected(option) }>

          <input
            className="OptionListOption__radio--hidden"
            type="radio"
            value={ option.value }
            checked={ this.isSelected(option) }
            readOnly
            onKeyDown={ this.handleKeyDown }
            id={ `option-list-item-${option.value}` }
            name="selected-option" />

          <label htmlFor={ `option-list-item-${option.value}` }>
            <OptionClass
              className={ classes }
              label={ option.label }
              value={ option.value }  />
          </label>
        </li>
      )
    })
  },

  render () {
    return (
      <div className={ `${this.props.className} OptionList OptionList--loose` }>
        <ul className="OptionList__list">
          { this.renderOptions() }
        </ul>
      </div>
    )
  }
})
