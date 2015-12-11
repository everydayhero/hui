'use strict'

import React from 'react'

export default {
  types: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      'text',
      'number',
      'password',
      'email'
    ]),
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    placeHolder: React.PropTypes.string,
    className: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    hint: React.PropTypes.string,
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
    validate: React.PropTypes.func,
    onError: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onTab: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onIconClick: React.PropTypes.func
  },
  defaults: {
    id: '',
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
}
