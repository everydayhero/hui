'use strict';

var compact = require('lodash/array/compact');
var React = require('react');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    fixedWidth: React.PropTypes.bool,
    spin: React.PropTypes.bool,
    type: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      fixedWidth: false,
      spin: false,
      type: '',
      onClick: () => {}
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
      <span className={ wrapperClasses } onTouchStart={ this.props.onClick } onMouseDown={ this.props.onClick }><i className={ classes } /></span>
    );
  }
});
