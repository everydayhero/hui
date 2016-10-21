'use strict'

import React from 'react'
import validatable from '../../mixins/validatable'
import inputMessage from '../../mixins/inputMessage'
import classnames from 'classnames'
import TextInput from '../TextInput'
import OptionList from '../OptionList'
import getJSON from '../../lib/getJSON'
import merge from 'lodash/merge'
import debounce from 'lodash/debounce'
import I18n from '../../mixins/I18n'
import i18n from './i18n'

export default React.createClass({
  displayName: 'UrlSearchSelect',

  mixins: [I18n, validatable, inputMessage],

  propTypes: {
    label: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    queryProperty: React.PropTypes.string,
    minQueryLength: React.PropTypes.number,
    responseProperty: React.PropTypes.string,
    deserializeResponse: React.PropTypes.func,
    manualAction: React.PropTypes.node,
    showError: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    onError: React.PropTypes.func,
    hint: React.PropTypes.string,
    emptyLabel: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    errors: React.PropTypes.array,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string,
    pendingRequest: React.PropTypes.bool,
    initialValue: React.PropTypes.number,
    initialLabel: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      label: 'Search',
      params: {},
      queryProperty: 'q',
      minQueryLength: 5,
      manualAction: null,
      responseProperty: 'resources',
      showError: false,
      onChange: () => {},
      onSelection: () => {},
      onError: () => {},
      hint: '',
      emptyLabel: '',
      errorMessage: '',
      errors: [],
      layout: 'full',
      spacing: 'loose',
      pendingRequest: false,
      initialValue: null,
      initialLabel: ''
    }
  },

  getInitialState () {
    return {
      isOpen: false,
      value: this.props.initialValue,
      queryValue: this.props.initialLabel,
      results: [],
      pendingRequest: this.props.pendingRequest
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.showError !== this.props.showError) {
      this.setState({ hasError: nextProps.showError })
    }
  },

  deserializeResponse (response) {
    let method = this.props.deserializeResponse || this.defaultDeserializer
    return method.call(this, response)
  },

  defaultDeserializer (response) {
    return response[this.props.responseProperty]
  },

  getParams (query) {
    return merge(this.props.params, {
      __jsonp: this.props.jsonp,
      [this.props.queryProperty]: query
    })
  },

  fetchResults (query) {
    let endState = { pendingRequest: null, isOpen: true }
    return getJSON(this.props.url, this.getParams(query))
      .then(response => {
        if (!response) { return }
        let results = this.deserializeResponse(response)
        this.setState({
          ...endState,
          results
        })
      })
      .catch(err => {
        this.setState(endState)
        this.props.onError(err)
      })
  },

  cancelRequest () {
    if (this.state.pendingRequest) {
      this.state.pendingRequest.cancel()
      this.setState({ pendingRequest: null })
    }
  },

  queueResultFetch: debounce(function (query) {
    if (this.isMounted()) {
      this.setState({ pendingRequest: this.fetchResults(query) })
    }
  }, 250, { trailing: true }),

  handleSearchInputChange (query) {
    if (query === this.state.queryValue) { return }
    let queryBelowMin = query.length < this.props.minQueryLength
    this.cancelRequest()
    this.props.onChange(query)
    this.setState({
      queryValue: query,
      hasError: false,
      results: queryBelowMin ? [] : this.state.results,
      isOpen: queryBelowMin ? false : this.state.isOpen
    }, () => (query.length >= this.props.minQueryLength) && this.queueResultFetch(query))
  },

  handleSelection (option) {
    if (!option) { return }
    this.setState({
      isOpen: false,
      selectedOption: option,
      value: option.value,
      queryValue: option.label
    }, () => {
      this.requireValue()
      this.props.onChange(option.value)
      this.props.onSelection(option)
    })
  },

  debouncedRequireValue: debounce(function () {
    this.requireValue()
  }, 100),

  handleBlur () {
    this.debouncedRequireValue()
  },

  keyHandlers: {
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
      if (optionList) {
        e.preventDefault()
        optionList.focus()
      }
    }
  },

  handleKeyDown (e) {
    let key = e.keyCode || e.which

    if (this.keyHandlers[key]) {
      this.keyHandlers[key].call(this, e)
    }
  },

  requireValue () {
    let { required } = this.props
    let { selectedOption, isOpen } = this.state
    let hasError = !!required && !selectedOption
    this.setState({
      hasError,
      isOpen: hasError ? true : isOpen
    }, () => {
      this.props.onError(hasError)
    })
  },

  render () {
    let { props, state } = this
    let classes = classnames([
      props.className,
      'hui-UrlSearchSelect--' + props.layout,
      'hui-UrlSearchSelect--' + props.spacing,
      'hui-UrlSearchSelect',
      !!state.isOpen && 'hui-UrlSearchSelect--open',
      !!state.hasError && 'hui-UrlSearchSelect--error'
    ])
    let inputIcon = state.pendingRequest || props.pendingRequest ? 'refresh'
      : state.isOpen ? 'chevron-down'
      : 'search'

    return (
      <div
        onBlur={this.handleBlur}
        className={classes}>
        <TextInput
          ref='searchInput'
          className='hui-UrlSearchSelect__search-input'
          spacing='compact'
          value={state.queryValue}
          icon={inputIcon}
          label={props.label}
          showError={props.showError || state.hasError}
          required={props.required}
          onKeyDown={this.handleKeyDown}
          onError={props.onError}
          onChange={this.handleSearchInputChange}
          errorMessage={props.errorMessage}
          errors={props.errors} />
        { state.isOpen
          ? <div className='hui-UrlSearchSelect__dropdown'>
            <OptionList
              ref='optionList'
              spacing='compact'
              className='hui-UrlSearchSelect__option-list'
              emptyLabel={props.emptyLabel || this.t('empty_label')}
              options={state.results}
              selectedOption={state.selectedOption}
              onSelection={this.handleSelection} />

            { !!props.manualAction &&
              <div className='hui-UrlSearchSelect__manual-action'>
                { props.manualAction }
              </div> }
          </div>
          : null
        }
      </div>
    )
  },

  statics: {
    i18n
  }
})
