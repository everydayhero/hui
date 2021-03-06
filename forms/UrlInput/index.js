'use strict'

import _ from 'lodash'
import React from 'react'
import SelectInput from '../SelectInput'
import Input from '../TextInput'
import LocalStorageMixin from '../../mixins/localStorage'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'UrlInput',

  mixins: [LocalStorageMixin],

  propTypes: {
    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    hint: React.PropTypes.node,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    includeBlank: React.PropTypes.bool,
    onTab: React.PropTypes.func,
    required: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string,
    options: React.PropTypes.array,
    prompt: React.PropTypes.string,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    label: React.PropTypes.node,
    protocolLabel: React.PropTypes.string,
    errorMessage: React.PropTypes.node
  },

  getDefaultProps: function () {
    return {
      autoComplete: true,
      storeLocally: false,
      autoFocus: false,
      disabled: false,
      icon: null,
      onFocus: function () {},
      onChange: function () {},
      onError: function () {},
      onBlur: function () {},
      onTab: function () {},
      onIconClick: null,
      readOnly: false,
      required: false,
      showIcon: true,
      name: null,
      id: null,
      errors: [],
      errorMessage: '',
      hint: '',
      type: 'text',
      value: null,
      layout: 'full',
      spacing: 'loose',
      protocolLabel: 'protocol',
      label: 'url'
    }
  },

  getInitialState: function () {
    return {
      protocol: '',
      path: ''
    }
  },

  componentWillMount: function () {
    this._updateState(this.props.value)
  },

  _handlePathChange: function (value) {
    var fullPath = this._updateState(value)
    this.props.onChange(fullPath.path && fullPath.protocol + fullPath.path)
  },

  _handleProtocolChange: function (value) {
    this.setState({ protocol: value })
    this.props.onChange(this.state.path && value + this.state.path)
  },

  _updateState: function (path) {
    var pathProtocol = path && path.match(/^https?:\/\//g)
    var newState = {
      protocol: path && this.state.protocol || 'http://',
      path: path && path.toLowerCase()
    }

    if (pathProtocol) {
      newState.protocol = pathProtocol[0]
      newState.path = path.substring(pathProtocol[0].length)
    }
    this.setState(newState)

    return newState
  },

  mask: function (value) {
    return value.replace(' ', '')
  },

  render: function () {
    var props = this.props
    var state = this.state
    var id = props.id
    var classes = classnames([
      'hui-UrlInput--' + props.layout,
      'hui-UrlInput--' + props.spacing,
      'hui-UrlInput'
    ])

    return (
      <div className={classes}>
        <SelectInput
          {..._.omit(props, 'errors')}
          id={id + '_protocol'}
          value={state.protocol}
          className='hui-UrlInput__protocol'
          onChange={this._handleProtocolChange}
          layout='quarter'
          spacing='tight'
          label={props.protocolLabel}
          options={[
            { value: 'http://', label: 'http://' },
            { value: 'https://', label: 'https://' }
          ]} />
        <Input
          {...props}
          id={id + '_path'}
          value={state.path}
          mask={this.mask}
          layout='threeQuarters'
          spacing='tight'
          onChange={this._handlePathChange}
          className='hui-UrlInput__path' />
      </div>
    )
  }
})
