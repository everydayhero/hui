'use strict';

import React from 'react'

import renderModal from '../../../lib/renderModal'
import AggregateSearch from '../../../search/AggregateSearchModal'
import Icon from '../../../atoms/Icon'

import cx from 'classnames'

export default React.createClass({
  displayName: 'NavSearch',

  propTypes: {
    transparent: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['mobile', 'desktop']).isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    region: React.PropTypes.string.isRequired,
    onFocus: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      transparent: false,
      label: '',
      onFocus: () => {}
    }
  },

  getInitialState() {
    return {
      focused: false,
      value: ''
    }
  },

  setValue(e) {
    this.setState({ value: e.target.value })
  },

  clearSearch() {
    this.setState({ value: '' })
  },

  triggerSearch() {
    if (this.state.value) {
      renderModal(AggregateSearch, {
        autoFocus: true,
        searchTerm: this.state.value,
        country: this.props.region
      })
    }
  },

  onEnter(e) {
    if (e.keyCode === 13) { this.triggerSearch() }
  },

  onFocus() {
    this.setState({ focused: true })
    this.props.onFocus(true)
    window.addEventListener('keydown', this.onEnter)
  },

  onBlur() {
    this.setState({ focused: false })
    this.props.onFocus(false)
    window.removeEventListener('keydown', this.onEnter)
  },

  render() {
    let props = this.props
    let state = this.state
    let classes = cx({
      'hui-NavSearch--transparent': props.transparent,
      'hui-NavSearch--focused': state.focused,
      'hui-NavSearch--hasValue': state.value
    }, 'hui-NavSearch', 'hui-NavSearch--' + props.kind)

    return (
      <div className={ classes }>
        <label className="hui-NavSearch__label" htmlFor={ props.name }>
          <Icon className="hui-NavSearch__icon" icon="search" onClick={ this.triggerSearch } />
          <input className="hui-NavSearch__input"
            ref="input"
            name={ props.name }
            id={ props.name }
            value={ state.value }
            onChange={ this.setValue }
            onFocus={ this.onFocus }
            onBlur={ this.onBlur }
            placeholder={ props.label } />
          <Icon className="hui-NavSearch__close" icon="times" onClick={ this.clearSearch } />
        </label>
      </div>
    )
  }
})
