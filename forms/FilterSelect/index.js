'use strict'

import React from 'react'
import find from 'lodash/collection/find'
import isEqual from 'lodash/lang/isEqual'
import validatable from '../../mixins/validatable'
import inputMessage from '../../mixins/inputMessage'
import FocusAggregate from '../FocusAggregate'
import FilterSelectDisplay from './Display'
import OptionList from '../OptionList'
import Filter from '../Filter'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'FilterSelect',

  mixins: [validatable, inputMessage],

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    data: React.PropTypes.object,
    options: React.PropTypes.array.isRequired,
    labelKey: React.PropTypes.string,
    valueKey: React.PropTypes.string,
    properties: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    hint: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    errors: React.PropTypes.array,
    validate: React.PropTypes.func,
    displayProperty: React.PropTypes.string,
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
      labelKey: 'label',
      valueKey: 'value',
      data: null,
      Display: FilterSelectDisplay,
      onChange: () => {},
      onSelection: () => {},
      onOpen: () => {},
      onFocus: () => {},
      onBlur: () => {},
      hint: '',
      errorMessage: '',
      errors: [],
      validate: () => {},
      layout: 'full',
      spacing: 'loose'
    }
  },

  getInitialState () {
    let props = this.props
    return {
      focused: false,
      value: props.value || '',
      filteredOptions: props.options,
      selectedOption: this.getSelected(props.value, props.data),
      isOpen: false,
      filterValue: ''
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value || !isEqual(nextProps.data, this.props.data)) {
      this.setState({
        value: nextProps.value,
        data: nextProps.data,
        selectedOption: this.getSelected(nextProps.value, nextProps.data)
      })
    }
  },

  getSelected(value, data) {
    value = value || ''
    const { valueKey } = this.props
    return find(this.props.options, opt => (
      opt[valueKey] && opt[valueKey].toString() === value.toString()) ||
      isEqual(opt, data)
    )
  },

  handleFilter (filteredOptions) {
    return this.setState({ filteredOptions })
  },

  openOptionList () {
    this.setState({
      isOpen: true,
      filterValue: ''
    }, this.props.onOpen)
  },

  closeOptionList () {
    this.setState({
      isOpen: false
    })
  },

  handleFocus () {
    this.setState({
      focused: true
    }, () => {
      this.openOptionList()
      this.props.onFocus()
    })
  },

  handleBlur () {
    this.setState({
      focused: false
    }, () => {
      this.closeOptionList()
      this.props.onBlur()
      this.validate()
    })
  },

  handleSelection (option) {
    const { labelKey, valueKey } = this.props
    this.setState({
      isOpen: false,
      selectedOption: option,
      filterValue: option[labelKey],
      value: option[valueKey] && option[valueKey].toString()
    }, () => {
      this.refs.displayInput.getDOMNode().focus()
      this.props.onChange(option[valueKey])
      this.props.onSelection(option)
      this.validate()
    })
  },

  handleFilterChange (filterValue) {
    this.setState({ filterValue })
  },

  filterKeyHandlers: {
    9() {
      let optionList = this.refs.optionList
      if (optionList) {
        optionList.keyHandlers[9].call(optionList)
      }
    },
    13(e) {
      let optionList = this.refs.optionList
      if (optionList) {
        optionList.keyHandlers[13].call(optionList, e)
      }
    },
    40(e) {
      let optionList = this.refs.optionList
      let filter = this.refs.filter
      if (optionList) {
        e.preventDefault()
        filter.blur()
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
    let value = !!e.target && e.target.value
    this.handleSelection(this.getSelected(value))
  },

  handleDisplayClick (e) {
    e.preventDefault()
    this.openOptionList()
  },

  renderDisplay () {
    const selected = this.state.selectedOption
    const {
      id,
      label,
      name,
      Display,
      valueKey,
      labelKey
    } = this.props

    return (
      <div className="hui-FilterSelect__display">
        <Display
          label={ label }
          selected={ selected }
          displayProperty={ this.props.displayProperty }/>

        <select
          id={ id }
          ref="displayInput"
          name={ name }
          value={ !!selected && selected[valueKey] }
          className="hui-FilterSelect__display-input"
          onChange={ this.handleDisplayChange }
          onFocus={ (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.setState({
              focused: true
            })
          } }
          onKeyDown={ this.handleDisplayKeyDown }
          onMouseDown={ this.handleDisplayClick }
          onClick={ this.handleDisplayClick }>

          { this.props.options.map((option) => {
            return (
              <option
                key={ option.value }
                value={ option[valueKey] }
                label={ option[labelKey] }>
                { option[labelKey] }
              </option>
            )
          }) }
        </select>
      </div>
    )
  },

  renderFilter () {
    const {
      filterValue,
      selectedOption,
      filteredOptions
    } = this.state

    const {
      properties,
      options,
      filterLabel,
      Option,
      labelKey,
      valueKey
    } = this.props

    return (
      <div>
        <Filter
          ref="filter"
          inputOptions={{
            autoFocus: true,
            spacing: 'compact',
            className: 'hui-FilterSelect__filter-input',
            onKeyDown: this.handleFilterKeyDown
          }}
          filterValue={ filterValue }
          properties={ properties }
          collection={ options }
          label={ filterLabel }
          onChange={ this.handleFilterChange }
          onFilter={ this.handleFilter } />
        <OptionList
          className="hui-FilterSelect__option-list"
          ref="optionList"
          spacing="compact"
          Option={ Option }
          onSelection={ this.handleSelection }
          selectedOption={ selectedOption }
          labelKey={ labelKey }
          valueKey={ valueKey }
          options={ filteredOptions } />
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
      <FocusAggregate
        className={ classes }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }>
        { this.state.isOpen ? this.renderFilter() : this.renderDisplay() }
        { this.renderMessage() }
      </FocusAggregate>
    )
  }
})
