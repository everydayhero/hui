'use strict'

import React from 'react'
import ToggleableOptionGroup from '../ToggleableOptionGroup'
import Icon from '../../atoms/Icon'
import sync from '../../lib/sync'
import map from 'lodash/collection/map'
import isBoolean from 'lodash/lang/isBoolean'

export default React.createClass({
  displayName: 'ToggleableOptionForm',

  propTypes: {
    options: React.PropTypes.object,
    url: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return { options: null }
  },

  getInitialState() {
    return { options: this.props.options }
  },

  componentDidMount() {
    if (!this.props.options) { this.synchronize() }
  },

  getUrl(namespace, value) {
    let { url, token } = this.props
    return (namespace && isBoolean(value))
      ? `${ url }/${ namespace }?access_token=${ token }&value=${ value }`
      : `${ url }?access_token=${ token }`
  },

  synchronize(namespace, value) {
    let method = (namespace && isBoolean(value)) ? 'put' : 'get'
    return sync(this.getUrl(namespace, value), method)
      .then(res => res.results && this.setState({ options: res.results }))
  },

  renderToggleableOptionGroup(group, key) {
    let { label, values } = group
    return (
      <ToggleableOptionGroup
        onChange={ this.synchronize }
        key={ key }
        name={ key }
        options={ values }
        label={ label } />
    )
  },

  render() {
    return (
        <div className="ToggleableOptionForm">
          { !this.state.options
            ? <Icon className="ToggleableOptionForm--loading" icon='circle-o-notch' />
            : map(this.state.options, this.renderToggleableOptionGroup) }
        </div>
      )
  }
})
