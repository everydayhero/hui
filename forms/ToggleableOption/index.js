'use strict'

import React from 'react'
import cx from 'classnames'
import Icon from '../../atoms/Icon'
import Tooltip from '../../atoms/Tooltip'
import I18n from '../../mixins/I18n'

export default React.createClass({
  displayName: 'ToggleableOption',

  mixins: [I18n],

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    partialChecked: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    value: React.PropTypes.bool.isRequired
  },

  getDefaultProps () {
    return { description: '' }
  },

  getInitialState () {
    return {
      loading: false,
      error: false
    }
  },

  handleError (err) {
    this.setState({
      loading: false,
      error: !!err
    })
  },

  handleChange (e) {
    let { checked } = e.target, { state, props } = this
    if (state.loading || (checked === props.value)) { return false }
    this.setState({ loading: true, error: false })
    props.onChange(props.name, checked)
      .then(() => this.setState({ loading: false, error: false }))
      .catch(this.handleError)
  },

  render () {
    let { loading, error } = this.state
    let { partialChecked, name, label, value, description } = this.props
    let classes = cx([
      'ToggleableOption__checkbox',,
      value && 'ToggleableOption__checkbox--checked',
      partialChecked && 'ToggleableOption__checkbox--partial',
      loading && 'ToggleableOption__checkbox--loading',
      error && 'ToggleableOption__checkbox--error'
    ])
    let icon = loading ? 'refresh'
      : error ? 'exclamation'
      : value ? 'check'
      : partialChecked ? 'minus'
      : ''

    return (
      <span className='ToggleableOption__wrapper'>
        { description && <Tooltip text={description} className='ToggleableOption__tooltip' /> }
        <label className='ToggleableOption' htmlFor={name}>
          <input className='ToggleableOption__hiddenInput'
            id={name}
            type='checkbox'
            checked={value}
            name={name}
            onChange={this.handleChange} />
          <Icon className={classes} icon={icon} />
          { label }
          { error && <span className='ToggleableOption__error'>{ this.t('error_message') }</span> }
          { loading && <span className='ToggleableOption__loading'>{ this.t('loading_message') }</span> }
        </label>
      </span>
    )
  },

  statics: {
    i18n: require('./i18n')
  }
})
