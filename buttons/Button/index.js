'use strict';

import React from 'react'
import Icon from '../../atoms/Icon'
import classnames from 'classnames'

module.exports = React.createClass({
  displayName: 'Button',

  propTypes: {
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    iconLeft: React.PropTypes.bool,
    iconSpin: React.PropTypes.bool,
    id: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    borderless: React.PropTypes.bool,
    kind: React.PropTypes.oneOf([
      'cta', 'cta-borderless',
      'primary', 'primary-borderless',
      'secondary', 'secondary-borderless',
      'tertiary', 'tertiary-borderless'
    ]).isRequired,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    target: React.PropTypes.string,
    thin: React.PropTypes.bool,
    type: React.PropTypes.oneOf(
      ['submit', 'reset', 'button']
    ),
    uppercase: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      disabled: false,
      href: null,
      icon: '',
      iconLeft: false,
      iconSpin: false,
      borderless: false,
      inverse: false,
      label: '',
      target: null,
      thin: false,
      type: 'button'
    };
  },

  getInitialState: function() {
    return {
      state: null
    };
  },

  ignoreClick: function(e) {
    e.preventDefault();
  },

  propogateClick: function(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  },

  icon: function() {
    var props = this.props;

    if (props.icon) {
      return <Icon className="hui-Button__icon" icon={ props.icon } spin={ props.iconSpin } />;
    }
  },

  render: function() {
    var El;
    var props = this.props;
    var href = props.href;
    var clickHandler = props.disabled ? this.ignoreClick : this.propogateClick;
    var kind = props.borderless ? props.kind + '-borderless' : props.kind;

    var classes = classnames([
      'hui-Button',
      'hui-Button--' + kind,
      props.disabled && 'hui-Button--disabled',
      props.inverse && 'hui-Button--inverse',
      props.thin && 'hui-Button--thin',
      props.icon && 'hui-Button--hasIcon',
      props.iconLeft && 'hui-Button--iconLeft',
      props.uppercase && 'hui-Button--uppercase'
    ]);

    if (href) {
      El = 'a';
    } else {
      El = 'button';
    }

    return (
      <El target={ props.target } className={ classes }
        id={ props.id }
        tabIndex={ 1 }
        type={ props.type }
        to={ href }
        href={ href }
        disabled={ props.disabled && 'disabled' }
        onClick={ clickHandler }>
        { this.icon() }
        <span className="hui-Button__label">{ props.label || props.children }</span>
      </El>
    );
  }
});
