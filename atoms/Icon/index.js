'use strict';

var compact = require('lodash/array/compact');
var React = require('react');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    fixedWidth: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    spin: React.PropTypes.bool,
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      fixedWidth: false,
      spin: false,
      type: '',
      onClick: () => {}
    }
  },

  onClick(e) {
    var props = this.props;
    if (!props.disabled) {
      props.onClick(e);
    }
  },

  render: function() {
    var spin = this.props.icon === 'circle-o-notch' || this.props.icon === 'spinner' || this.props.icon === 'refresh' || this.props.spin;
    var classes = compact([
      'hui-Icon',
      this.props.type && ('hui-Icon--' + this.props.type),
      'fa',
      this.props.fixedWidth && 'fa-fw',
      spin && 'fa-spin',
      'fa-' + (this.props.icon || '')
    ]).join(' ');
    var wrapperClasses = compact(['hui-IconWrapper', this.props.className]).join(' ');

    return (
      <span className={ wrapperClasses } onTouchStart={ this.onClick } onMouseDown={ this.onClick }><i className={ classes } /></span>
    );
  }
});
