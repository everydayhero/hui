'use strict';

import React from 'react'
import validatable from '../../mixins/validatable'
import inputMessage from '../../mixins/inputMessage'
import classnames from 'classnames'
import TextInput from '../TextInput'
import OptionList from '../OptionList'
import getJSON from '../../lib/getJSON'
import merge from 'lodash/object/merge'
import debounce from 'lodash/function/debounce'
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
    onChange: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    onError: React.PropTypes.func,
    hint: React.PropTypes.string,
    emptyLabel: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    errors: React.PropTypes.array,
    validate: React.PropTypes.func,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string,
    pendingRequest: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      label: 'Search',
      queryProperty: 'q',
      minQueryLength: 5,
      manualAction: [],
      responseProperty: 'resources',
      onChange: () => {},
      onSelection: () => {},
      onError: () => {},
      hint: '',
      emptyLabel: '',
      errorMessage: '',
      errors: [],
      validate: () => {},
      layout: 'full',
      spacing: 'loose',
      pendingRequest: false
    }
  },

  getInitialState() {
    return {
      isOpen: false,
      value: '',
      results: [],
      pendingRequest: this.props.pendingRequest
    }
  },

  deserializeResponse(response) {
    let method = this.props.deserializeResponse || this.defaultDeserializer
    return method.call(this, response)
  },

  defaultDeserializer(response) {
    return response[this.props.responseProperty]
  },

  getParams(query) {
    return merge(this.props.params, {
      [this.props.queryProperty]: query
    })
  },

  fetchResults(query) {
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

  cancelRequest() {
    if (this.state.pendingRequest) {
      this.state.pendingRequest.cancel()
      this.setState({ pendingRequest: null })
    }
  },

  queueResultFetch: debounce(function(query) {
    if (this.isMounted()) {
      this.setState({ pendingRequest: this.fetchResults(query) })
    }
  }, 250, { trailing: true }),

  handleSearchInputChange(query) {
    let queryBelowMin = query.length < this.props.minQueryLength
    this.cancelRequest()
    this.setState({
      queryValue: query,
      hasError: false,
      results: queryBelowMin ? [] : this.state.results,
      isOpen: queryBelowMin ? false : this.state.isOpen
    }, () => {
      this.props.onChange(query)
      if (query.length >= this.props.minQueryLength) { this.queueResultFetch(query) }
    })
  },

  handleSelection(option) {
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

  keyHandlers: {
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
      if (optionList) {
        e.preventDefault()
        optionList.focus()
      }
    }
  },

  handleKeyDown(e) {
    let key = e.keyCode || e.which

    if (this.keyHandlers[key]) {
      this.keyHandlers[key].call(this, e)
    }
  },

  requireValue() {
    let hasError = this.props.required && !this.state.selectedOption
    this.setState({
      hasError,
      isOpen: hasError
    }, () => {
      this.props.onError(hasError)
    })
  },

  render() {
    let props = this.props
    let state = this.state
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
      <div className={ classes }>
        <TextInput
          ref="searchInput"
          className="hui-UrlSearchSelect__search-input"
          spacing="compact"
          value={ state.queryValue }
          icon={ inputIcon }
          label={ props.label }
          showError={ state.hasError }
          onBlur={ this.requireValue }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleSearchInputChange }/>
        { state.isOpen ?
          <div className="hui-UrlSearchSelect__dropdown">
            <OptionList
              ref="optionList"
              spacing="compact"
              className="hui-UrlSearchSelect__option-list"
              emptyLabel={ props.emptyLabel || this.t('empty_label') }
              options={ state.results }
              selectedOption={ state.selectedOption }
              onSelection={ this.handleSelection } />

            { !!props.manualAction &&
              <div className="hui-UrlSearchSelect__manual-action">
                { props.manualAction }
              </div> }
          </div> : null }

        { this.renderMessage(state.hasError) }
      </div>
    )
  },

  statics: {
    i18n
  }
})
