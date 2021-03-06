'use strict'

import React from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import validatable from '../../mixins/validatable'
import inputMessage from '../../mixins/inputMessage'
import FocusAggregate from '../FocusAggregate'
import FilterSelectDisplay from './Display'
import OptionList from '../OptionList'
import DisplayWrap from './DisplayWrap'
import Filter from '../Filter'
import classnames from 'classnames'
import _ from 'lodash'

export default React.createClass({
  displayName: 'FilterSelect',

  mixins: [validatable, inputMessage],

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.node,
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
    spacing: React.PropTypes.string,
    maxResults: React.PropTypes.number,
    sort: React.PropTypes.string
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
      spacing: 'loose',
      maxResults: 100,
      sort: 'default'
    }
  },

  getInitialState () {
    let props = this.props
    return {
      focused: false,
      value: props.value || '',
      filteredOptions: this.getOptions().slice(0, props.maxResults),
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

  getSelected (value, data) {
    value = value || ''
    const { valueKey } = this.props
    return find(this.getOptions(), opt => (
      opt[valueKey] && opt[valueKey].toString() === value.toString()) ||
      isEqual(opt, data)
    )
  },

  getOptions () {
    let labelKey = this.props.labelKey
    let options = this.props.options

    if (this.props.sort === 'default') {
      return options
    }

    options = _.sortBy(options, (option) => option[labelKey].toLowerCase())

    return this.props.sort === 'asc' ? options : options.reverse()
  },

  handleFilter (filteredOptions) {
    const truncatedOptions = filteredOptions.slice(0, this.props.maxResults)
    return this.setState({ filteredOptions: truncatedOptions })
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
      focused: true,
      selectedOption: option,
      filterValue: option[labelKey],
      value: option[valueKey] && option[valueKey].toString()
    }, () => {
      this.closeOptionList()
      this.props.onChange(option[valueKey])
      this.props.onSelection(option)
      this.validate()
    })
  },

  handleFilterChange (filterValue) {
    this.setState({ filterValue })
  },

  filterKeyHandlers: {
    9 () {
      let optionList = this.refs.optionList
      if (optionList) {
        optionList.keyHandlers[9].call(optionList)
      }
    },
    13 (e) {
      let optionList = this.refs.optionList
      if (optionList) {
        optionList.keyHandlers[13].call(optionList, e)
      }
    },
    40 (e) {
      let optionList = this.refs.optionList
      e.preventDefault()
      if (optionList) {
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
    this.setState({
      focused: true
    }, () => {
      this.openOptionList()
    })
  },

  handleDisplayFocus () {
    this.setState({
      focused: true
    })
  },

  handleDisplayBlur () {
    this.setState({
      focused: false
    })
  },

  renderDisplay () {
    const {
      id,
      label,
      name,
      Display,
      valueKey,
      labelKey,
      displayProperty
    } = this.props
    const {
      focused,
      selectedOption: selected
    } = this.state

    return (
      <DisplayWrap
        ref='displayInput'
        options={this.getOptions()}
        id={id}
        label={label}
        displayProperty={displayProperty}
        name={name}
        Display={Display}
        valueKey={valueKey}
        labelKey={labelKey}
        focused={focused}
        selected={selected}
        onFocus={this.handleDisplayFocus}
        onBlur={this.handleDisplayBlur}
        onChange={this.handleDisplayChange}
        onKeyDown={this.handleDisplayKeyDown}
        onMouseDown={this.handleDisplayClick}
        onClick={this.handleDisplayClick} />
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
      filterLabel,
      Option,
      labelKey,
      valueKey
    } = this.props

    return (
      <div>
        <Filter
          ref='filter'
          inputOptions={{
            spacing: 'compact',
            className: 'hui-FilterSelect__filter-input',
            onKeyDown: this.handleFilterKeyDown
          }}
          focused
          filterValue={filterValue}
          properties={properties}
          collection={this.getOptions()}
          label={filterLabel}
          onChange={this.handleFilterChange}
          onFilter={this.handleFilter} />
        <OptionList
          className='hui-FilterSelect__option-list'
          ref='optionList'
          spacing='compact'
          Option={Option}
          onSelection={this.handleSelection}
          selectedOption={selectedOption}
          labelKey={labelKey}
          valueKey={valueKey}
          options={filteredOptions} />
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
        className={classes}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}>
        { this.state.isOpen ? this.renderFilter() : this.renderDisplay() }
        { this.renderMessage() }
      </FocusAggregate>
    )
  }
})
