"use strict";

var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  displayName: 'Icon',

  render: function() {
    var classes = _.compact([
      'hui-Icon',
      this.props.type && ('hui-Icon--' + this.props.type),
      'fa',
      this.props.fixedWith && 'fa-fw',
      this.props.spin && 'fa-spin',
      'fa-' + (this.props.icon || 'rocket')
    ]).join(' ');

    var wrapperClasses = _.compact(['IconWrapper', this.props.className]).join(' ');
    return (
      <span className={ wrapperClasses }><i className={classes} /></span>
    );
  }
});
