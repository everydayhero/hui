'use strict'

import React from 'react'
import Input from '../TextInput'
import Icon from '../../atoms/Icon'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'SearchInput',

  propTypes: {
    className: React.PropTypes.string,
    autoComplete: React.PropTypes.bool,
    storeLocally: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    showError: React.PropTypes.bool,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    placeHolder: React.PropTypes.string,
    errors: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    hint: React.PropTypes.string,
    mask: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    validate: React.PropTypes.func,
    onError: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onTab: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,
    spacing: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    layout: React.PropTypes.string
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
      onSubmit: function () {},
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
      value: '',
      layout: 'full',
      spacing: 'loose',
      label: 'Search'
    }
  },

  onSubmit: function () {
    let props = this.props
    props.onSubmit && props.onSubmit(props.value || '')
  },

  render: function () {
    let props = this.props
    let classes = classnames([
      props.className,
      'hui-SearchInput--' + props.layout,
      'hui-SearchInput--' + props.spacing,
      'hui-SearchInput'
    ])

    return (
      <div className={classes}>
        <div className='hui-SearchInput__wrapper'>
          <div className='hui-SearchInput__input'>
            <Input {...props} spacing='compact' layout='full' />
          </div>
          <div className='hui-SearchInput__submitWrapper'>
            <button className='hui-SearchInput__submit' onClick={this.onSubmit}>
              <Icon icon='search' />
            </button>
          </div>
        </div>
      </div>
    )
  }
})
