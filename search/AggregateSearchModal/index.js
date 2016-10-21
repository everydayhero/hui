'use strict'

import 'console-polyfill'

import Promise from 'bluebird'
import React from 'react'
import cx from 'classnames'
import I18n from '../../mixins/I18n'
import i18n from './i18n'
import Input from '../../forms/TextInput'
import Icon from '../../atoms/Icon'
import Overlay from '../../atoms/Overlay'
import search from '../../lib/search'

import debounce from 'lodash/debounce'
import uniq from 'lodash/uniq'
import zipObject from 'lodash/zipObject'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import campaign from '../AggregateSearchResultCampaign'
import charity from '../AggregateSearchResultCharity'
import page from '../AggregateSearchResultPage'

let resultTypes = {
  campaign,
  charity,
  page
}

export default React.createClass({
  displayName: 'AggregateSearchModal',

  mixins: [I18n],

  propTypes: {
    autoFocus: React.PropTypes.bool,
    searchTerm: React.PropTypes.string,
    country: React.PropTypes.oneOf(['au', 'ie', 'nz', 'uk', 'us']).isRequired,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      autoFocus: true,
      searchTerm: '',
      minimumScore: {
        all: 0.15,
        other: 0.01
      },
      pageSize: 10
    }
  },

  getInitialState () {
    return {
      searchTerm: this.props.searchTerm,
      search: () => {},
      searchCounts: () => {},
      results: null,
      isSearching: false,
      filter: 'all',
      counts: {}
    }
  },

  componentDidMount () {
    if (this.state.searchTerm) {
      this.search()
      this.searchCounts()
    }
  },

  componentWillUnmount () {
    this.cancelSearch(false)
  },

  cancelSearch (updateState) {
    this.state.search.cancel()
    this.state.searchCounts.cancel()
    if (updateState) { this.setState({ isSearching: false }) }
  },

  inputChanged (searchTerm) {
    if (searchTerm !== this.state.searchTerm) {
      this.cancelSearch(true)
      this.setState({ searchTerm }, this.delayedSearch)
    }
  },

  delayedSearch: debounce(function () {
    if (this.isMounted()) {
      if (this.state.searchTerm) {
        this.search()
        this.searchCounts()
      } else {
        this.clearResults()
      }
    }
  }, 300),

  search (page) {
    let params = {
      country_code: this.props.country,
      q: this.state.searchTerm,
      page: page || 1,
      page_size: this.props.pageSize,
      minimum_score: this.props.minimumScore[this.state.filter] || this.props.minimumScore.other
    }

    this.setState({
      results: page > 1 ? this.state.results : [],
      isSearching: true,
      searchPage: params.page,
      search: search[this.state.filter](params).then(this.updateResults).catch(this.cancelSearch)
    })
  },

  clearResults () {
    this.setState({
      results: null,
      isSearching: false,
      counts: {}
    })
  },

  updateResults (data) {
    if (data) {
      let pagination = data.meta.pagination
      let results = data[this.state.filter] || data.results

      if (!pagination || !pagination.first_page) {
        results = this.state.results.concat(results)
        results = uniq(results, (result) => result._type + result.id)
      }

      this.setState({
        results,
        isSearching: false,
        lastPage: pagination && pagination.last_page,
        currentPage: pagination && pagination.current_page
      })

      if (this.refs.body && pagination && pagination.current_page === 1) {
        this.refs.body.scrollTop = 0
      }
    } else {
      this.search(this.state.searchPage)
    }
  },

  searchCounts () {
    let self = this
    let types = ['campaigns', 'charities', 'pages']
    let params = {
      country_code: this.props.country,
      q: this.state.searchTerm,
      page: 1,
      page_size: 1,
      minimum_score: this.props.minimumScore.other
    }
    let getCount = data => data && data.meta.pagination.count

    let searchCounts = Promise.map(types, type => {
      return search[type](params).then(getCount)
    }).cancellable().then(counts => {
      self.updateCounts(zipObject(types, counts))
    }).catch(console.log.bind(console))

    this.setState({
      counts: {},
      searchCounts
    })
  },

  updateCounts (counts) {
    this.setState({ counts })
  },

  setFilter (filter) {
    this.setState({ filter }, this.search)
  },

  getResults () {
    return map(this.state.results, (result) => {
      let El = resultTypes[result._type]
      return El && <El key={result._type + result.id} result={result} />
    })
  },

  renderFilters () {
    let categories = map(this.t('filterTypes'), (name, type) => {
      let selected = type === this.state.filter
      let classes = cx({
        'AggregateSearchModal__filters__type': true,
        'AggregateSearchModal__filters__type-selected': selected
      })
      let onClick = this.setFilter.bind(this, selected ? 'all' : type)
      let count = this.state.counts[type]
      let numResults = count >= 0 ? this.t('numResults', { count }) : this.t('searching')

      return (
        <div className={classes} key={type} onClick={onClick}>
          { selected && <Icon icon='chevron-right' /> }
          <div className='AggregateSearchModal__filters__type__name'>{ name }</div>
          <div className='AggregateSearchModal__filters__type__results'>{ numResults }</div>
        </div>
      )
    }, this)

    return this.state.results && (
      <div className='AggregateSearchModal__filters'>
       { categories }
      </div>
    )
  },

  renderEmpty () {
    return isEmpty(this.state.results) && (
      <p className='AggregateSearchModal__footer'>
        { this.t(this.state.filter, { scope: 'emptyLabel' }) }
      </p>
    )
  },

  renderLoading () {
    return this.state.isSearching && (
      <p className='AggregateSearchModal__footer'>
        { this.t('searching') }<Icon icon='refresh' />
      </p>
    )
  },

  renderLoadMore () {
    return !this.state.lastPage && (
      <p className='AggregateSearchModal__footer'>
        <a href='#' onClick={this.search.bind(this, this.state.currentPage + 1)}>{ this.t('loadMore') }</a>
      </p>
    )
  },

  renderNoMore () {
    return (
      <p className='AggregateSearchModal__footer'>{ this.t('noMore') }</p>
    )
  },

  renderFooter () {
    return this.renderLoading() || this.renderEmpty() || this.renderLoadMore() || this.renderNoMore()
  },

  renderResults () {
    return this.state.results && (
      <div className='AggregateSearchModal__results'>
        { this.getResults() }
        { this.renderFooter() }
      </div>
    )
  },

  renderCloseButton () {
    return (
      <div className='AggregateSearchModal__close' onClick={this.props.onClose}>&times;</div>
    )
  },

  renderInput () {
    return (
      <Input
        className='AggregateSearchModal__input'
        spacing='compact'
        autoFocus={this.props.autoFocus}
        label={this.t('inputLabel')}
        name={'aggregate_search_input'}
        onChange={this.inputChanged}
        showIcon
        icon={this.state.isSearching ? 'refresh' : ''}
        value={this.state.searchTerm} />
    )
  },

  render () {
    return (
      <Overlay className='AggregateSearchModal__overlay' onClose={this.props.onClose} showCloseButton={false}>
        <div className='AggregateSearchModal__header'>
          <span className='AggregateSearchModal__title'>{ this.t('title') }</span>
          { this.renderCloseButton() }
          { this.renderInput() }
          { this.renderFilters() }
        </div>
        <div ref='body' className='AggregateSearchModal__body'>
          <div className='AggregateSearchModal__content'>
            { this.renderResults() }
          </div>
        </div>
      </Overlay>
    )
  },

  statics: {
    i18n
  }
})
