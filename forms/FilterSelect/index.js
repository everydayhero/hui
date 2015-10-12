'use strict';

import React from 'react'
import find from 'lodash/collection/find'
import validatable from '../../mixins/validatable'
import inputMessage from '../../mixins/inputMessage'
import FilterSelectDisplay from './Display'
import OptionList from '../OptionList'
import TextInput from '../TextInput'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'FilterSelect',

  mixins: [validatable, inputMessage],

  propTypes: {
    value: React.PropTypes.string,
    options: React.PropTypes.array.isRequired,
    properties: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    hint: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    errors: React.PropTypes.array,
    validate: React.PropTypes.func,
    Display: React.PropTypes.func,
    Option: React.PropTypes.func,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      label: 'Selected option',
      placeHolder: 'Select an option',
      filterLabel: 'Filter',
      properties: ['label'],
      value: '',
      Display: FilterSelectDisplay,
      onChange: () => {},
      onSelection: () => {},
      onOpen: () => {},
      hint: '',
      errorMessage: '',
      errors: [],
      validate: () => {},
      layout: 'full',
      spacing: 'loose'
    }
  },

  getInitialState () {
    let selected = find(this.props.options, (option) => {
      return (!!option.value && option.value) === this.props.value
    })

    return {
      focused: false,
      value: this.props.value || '',
      filteredOptions: this.props.options,
      selectedOption: selected,
      isOpen: false,
      filterValue: ''
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.value) {
      let selected = find(this.props.options, (option) => {
        return (!!option.value && option.value) === nextProps.value
      })

      this.setState({
        value: nextProps.value,
        selectedOption: selected
      })
    }
  },

  filter (filterValue) {
    let query = new RegExp(filterValue.split('').join('.*'), 'gi')

    return this.setState({
      filterValue,
      filteredOptions: this.props.options.filter((option) => {
        return this.props.properties.some((property) => {
          return option[property] && option[property].match(query)
        })
      })
    })
  },

  openOptionList () {
    this.setState({
      isOpen: true
    }, () => {
      this.props.onOpen()
      this.refs.filterInput.refs.input.getDOMNode().focus()
    })
  },

  setFocus (focused) {
    this.setState({ focused })
  },

  handleSelection (option) {
    this.setState({
      isOpen: false,
      selectedOption: option,
      filterValue: option.label,
      value: option.value
    }, () => {
      this.refs.displayInput.getDOMNode().focus()
      this.validate(option.value)
      this.props.onChange(option.value)
      this.props.onSelection(option)
    })
  },

  filterKeyHandlers: {
    9: function () {
      let optionList = this.refs.optionList
      if (optionList) {
        optionList.keyHandlers[9].call(optionList)
      }
    },
    13: function (e) {
      let optionList = this.refs.optionList
      if (optionList) {
        optionList.keyHandlers[13].call(optionList, e)
      }
    },
    40: function (e) {
      let optionList = this.refs.optionList
      if (optionList) {
        e.preventDefault()
        optionList.focus()
      }
    }
  },

  handleFilterKeyDown (e) {
    let key = e.keyCode || e.which

    if (this.filterKeyHandlers[key]) {
      this.filterKeyHandlers[key].call(this, e)
    }
  },

  handleDisplayKeyDown (e) {
    let key = e.keyCode || e.which

    if (key === 40) {
      e.preventDefault()
      this.openOptionList()
    }
  },

  handleDisplayChange (e) {
    let option = find(this.props.options, (option) => {
      return option.value === e.target.value
    })

    this.handleSelection(option)
  },

  handleDisplayClick (e) {
    e.preventDefault()
    this.openOptionList()
  },

  renderDisplay () {
    let Display = this.props.Display
    let selected = this.state.selectedOption

    return  (
      <div className="hui-FilterSelect__display">
        <Display selected={ selected } />

        <select
          ref="displayInput"
          className="hui-FilterSelect__display-input"
          onChange={ this.handleDisplayChange }
          onFocus={ (e) => { e.preventDefault(); this.setFocus(true) } }
          onBlur={ () => { this.setFocus(false) } }
          onKeyDown={ this.handleDisplayKeyDown }
          onMouseDown={ this.handleDisplayClick }
          onClick={ this.handleDisplayClick }>

          { this.props.options.map((option) => {
            return (
              <option
                selected={ option.value === selected.value }
                value={ option.value }
                label={ option.label }>
                { option.label }
              </option>
            )
          }) }
        </select>
      </div>
    )
  },

  renderFilter () {
    return (
      <div>
        <TextInput
          ref="filterInput"
          spacing="compact"
          className="hui-FilterSelect__filter-input"
          label={ this.props.filterLabel }
          value={ this.state.filterValue }
          onKeyDown={ this.handleFilterKeyDown }
          onChange={ this.filter } />
        <OptionList
          className="hui-FilterSelect__option-list"
          ref="optionList"
          spacing="compact"
          Option={ this.props.Option }
          onSelection={ this.handleSelection }
          selectedOption={ this.state.selectedOption }
          options={ this.state.filteredOptions } />
      </div>
    )
  },

  render () {
    let classes = classnames([
      this.props.className,
      'hui-FilterSelect--' + this.props.layout,
      'hui-FilterSelect--' + this.props.spacing,
      'hui-FilterSelect',
      !!this.state.value && !!this.state.value.trim() && 'hui-FilterSelect--hasValue',
      this.state.valid && 'hui-FilterSelect--valid',
      this.state.focused && 'hui-FilterSelect--focused',
      this.shouldShowError() && 'hui-FilterSelect--error'
    ])

    return (
      <div className={ classes }>
        { this.state.isOpen ? this.renderFilter() : this.renderDisplay() }
        { this.renderMessage(!!this.props.errorMessage || !!this.props.errors.length || !!this.props.hint) }
      </div>
    )
  }
})
