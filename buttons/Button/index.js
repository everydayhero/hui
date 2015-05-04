"use strict";

var React      = require('react');
var Classnames = require('classnames');
var Icon       = require('../../Helpers/Icon');

module.exports = React.createClass({
  displayName: 'Button',

  propTypes: {
    kind: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    label: React.PropTypes.string,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    thin: React.PropTypes.bool,
    uppercase: React.PropTypes.bool,
    iconLeft: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      label: '',
      icon: '',
      type: 'button',
      href: null,
      disabled: false,
      thin: false,
      inverse: false,
      iconLeft: false
    };
  },

  getInitialState: function() {
    return {
      state: null
    };
  },

  handleClick: function(e) {
    if(this.props.disabled) {
      e.preventDefault();
    }

    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e);
    }
  },

  handleDefaultClick: function(e) {
    if(this.props.disabled) {
      e.preventDefault();
    }
  },

  render: function() {
    var El;
    var props = this.props;
    var kind = props.kind;
    var href = props.href;

    var classes = Classnames({
      'hui-Button--cta': kind === 'cta',
      'hui-Button--primary': kind === 'primary',
      'hui-Button--secondary': kind === 'secondary',
      'hui-Button--tertiary': kind === 'tertiary',
      'hui-Button--disabled': props.disabled,
      'hui-Button--inverse': props.inverse,
      'hui-Button--thin': props.thin,
      'hui-Button--hasIcon': props.icon,
      'hui-Button--iconLeft': props.iconLeft,
      'hui-Button--uppercase': props.uppercase
    }, 'hui-Button');

    if (href) {
      El = 'a';
    } else {
      El = 'button';
    }

    return (
      <El className={ classes }
        tabIndex={ 1 }
        type={ props.type }
        to={ href }
        href={ href }
        onMouseUp={ !href && this.handleClick }
        onTouchEnd={ !href && this.handleClick }
        disabled={ props.disabled && 'disabled' }
        onClick={ this.handleDefaultClick }>
        <Icon className="hui-Button__icon" icon={ props.icon }/>
        <span className="hui-Button__label">{ props.label || props.children }</span>
      </El>
    );
  }
});
