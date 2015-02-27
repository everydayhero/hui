"use strict";

var React = require('react');
var cx = require('react/lib/cx');
var Icon = require('../../Helpers/Icon');

module.exports = React.createClass({
  displayName: 'Button',

  propTypes: {
    use: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    label: React.PropTypes.string,
    href: React.PropTypes.string,
    params: React.PropTypes.object,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    thin: React.PropTypes.bool,
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
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e);
    }
  },

  render: function() {
    var El;
    var props = this.props;
    var use = props.use;
    var href = props.href;

    var classes = cx({
      'hui-Button': true,
      'hui-Button--cta': use === 'cta',
      'hui-Button--primary': use === 'primary',
      'hui-Button--secondary': use === 'secondary',
      'hui-Button--tertiary': use === 'tertiary',
      'hui-Button--disabled': props.disabled,
      'hui-Button--inverse': props.inverse,
      'hui-Button--thin': props.thin,
      'hui-Button--hasIcon': props.icon,
      'hui-Button--iconLeft': props.iconLeft
    });

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
        params={ props.params }
        href={ href }
        onMouseUp={ !href && this.handleClick }
        onTouchStart={ !href && this.handleClick }>
        <Icon className="hui-Button__icon" icon={ props.icon }/>
        <span className="hui-Button__label">{ props.label }</span>
      </El>
    );
  }
});
