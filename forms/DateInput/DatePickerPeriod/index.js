"use strict";

var React      = require('react');
var Classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'hui-DatePickerPeriod',

  propTypes: {
    current: React.PropTypes.number,
    value: React.PropTypes.number,
    onClick: React.PropTypes.func
  },

  onClick: function(e) {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(this.props.value);
    }
  },

  isSelected: function() {
    return this.props.current ===  this.props.value;
  },

  render: function() {
    var classes = Classnames({
      'hui-DatePickerPeriod--selected': this.isSelected(),
    }, 'hui-DatePickerPeriod');

    return <a className={ classes } href="#" onClick={ this.onClick }>{ this.props.children } </a>;
  }
});
