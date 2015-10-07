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

export default React.createClass({
  displayName: 'UrlSearchSelect',

  mixins: [validatable, inputMessage],

  propTypes: {
    label: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    queryProperty: React.PropTypes.string,
    minQueryLength: React.PropTypes.number,
    responseProperty: React.PropTypes.string,
    deserializeResponse: React.PropTypes.func,
    manualActions: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onSelection: React.PropTypes.func,
    hint: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    errors: React.PropTypes.array,
    validate: React.PropTypes.func,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      label: 'Search',
      queryProperty: 'q',
      minQueryLength: 5,
      manualActions: [],
      responseProperty: 'resources',
      onChange: () => {},
      onSelection: () => {},
      hint: '',
      errorMessage: '',
      errors: [],
      validate: () => {},
      layout: 'full',
      spacing: 'loose'
    }
  },

  getInitialState () {
    return {
      isOpen: false,
      params: this.props.params,
      value: '',
      results: [],
      pendingRequest: null
    }
  },

  deserializeResponse (response) {
    let method = this.props.deserializeResponse || this.defaultDeserializer
    return method.call(this, response)
  },

  defaultDeserializer (response) {
    return response[this.props.responseProperty]
  },

  getParams () {
    return merge(this.props.params, {
      __jsonp: this.props.jsonp,
      [this.props.queryProperty]: this.state.queryValue
    })
  },

  setWaiting (waiting) {
    this.refs.searchInput.setState({
      waiting
    })
  },

  fetchResults () {
    let request = getJSON(this.props.url, this.getParams())
    request.then((response) => {
      let results = this.deserializeResponse(response)
      this.setState({
        pendingRequest: null,
        isOpen: true,
        results
      }, () => {
        this.setWaiting(false)
      })
    })
    return request
  },

  queueResultFetch: debounce(function (query) {
    if (this.state.pendingRequest) {
      this.state.pendingRequest.cancel()
    }
    let request = this.fetchResults(query)
    this.setState({
      pendingRequest: request
    }, () => {
      this.setWaiting(true)
    })
    return request
  }, 250, { trailing: true }),

  handleSearchInputChange (query) {
    this.setState({
      queryValue: query
    }, () => {
      if (query.length < this.props.minQueryLength) return

      this.queueResultFetch(query)
    })
  },

  handleSelection (option) {
    this.setState({
      isOpen: false,
      selectedOption: option,
      value: option.value,
      queryValue: option.label
    }, () => {
      this.props.onChange(option.value)
      this.props.onSelection(option)
    })
  },

  handleKeyDown (e) {
    let key = e.keyCode || e.which

    if (key === 40 && this.refs.optionList) {
      e.preventDefault()
      this.refs.optionList.focus()
    }
  },

  render () {
    let classes = classnames([
      this.props.className,
      'hui-UrlSearchSelect--' + this.props.layout,
      'hui-UrlSearchSelect--' + this.props.spacing,
      'hui-UrlSearchSelect',
      !!this.state.isOpen && 'hui-UrlSearchSelect--open'
    ])

    return (
      <div className={ classes }>
        <TextInput
          ref="searchInput"
          className="hui-UrlSearchSelect__search-input"
          spacing="compact"
          value={ this.state.queryValue }
          label={ this.props.label }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleSearchInputChange }/>
        { this.state.isOpen ?
          <div className="hui-UrlSearchSelect__dropdown">
            <OptionList
              ref="optionList"
              spacing="compact"
              className="hui-UrlSearchSelect__option-list"
              options={ this.state.results }
              selectedOption={ this.state.selectedOption }
              onSelection={ this.handleSelection } />

            { !!this.props.manualActions.length &&
              <div className="hui-UrlSearchSelect__manual-actions">
                { this.props.manualActions }
              </div> }
          </div> : null }
        { this.renderMessage(!!this.props.errorMessage || !!this.props.errors.length || !!this.props.hint) }
      </div>
    )
  }
})
