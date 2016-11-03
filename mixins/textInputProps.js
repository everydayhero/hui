'use strict'

import React from 'react'

export const types = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.oneOf([
    'text',
    'number',
    'password',
    'email'
  ]),
  value: React.PropTypes.string,
  label: React.PropTypes.node,
  placeHolder: React.PropTypes.string,
  className: React.PropTypes.string,
  errorMessage: React.PropTypes.node,
  hint: React.PropTypes.node,
  icon: React.PropTypes.string,
  iconPosition: React.PropTypes.string,
  spacing: React.PropTypes.oneOf([
    'compact',
    'tight',
    'fitted',
    'loose'
  ]),
  layout: React.PropTypes.oneOf([
    'full',
    'wide',
    'twoThirds',
    'half',
    'narrow',
    'quarter',
    'threeQuarters',
    'eighth',
    'sevenEighths',
    'third'
  ]),

  autoComplete: React.PropTypes.bool,
  storeLocally: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  showError: React.PropTypes.bool,
  required: React.PropTypes.bool,
  showIcon: React.PropTypes.bool,

  errors: React.PropTypes.array,

  limit: React.PropTypes.number,

  mask: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onChange: React.PropTypes.func,
  validate: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.array
  ]),
  onError: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onTab: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onIconClick: React.PropTypes.func
}

export const defaults = {
  id: '',
  name: '',
  type: 'text',
  value: '',
  label: 'Input',
  placeHolder: '',
  className: '',
  errorMessage: '',
  hint: '',
  icon: '',
  iconPosition: 'right',
  spacing: 'loose',
  layout: 'full',

  autoComplete: true,
  storeLocally: false,
  autoFocus: false,
  disabled: false,
  showError: false,
  required: false,
  showIcon: true,
  readOnly: false,

  errors: [],

  limit: 0,

  mask: str => str,
  onFocus: () => {},
  onChange: () => {},
  validate: null,
  onError: () => {},
  onBlur: () => {},
  onTab: () => {},
  onKeyDown: () => {},
  onIconClick: () => {}
}
