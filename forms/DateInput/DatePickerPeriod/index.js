"use strict";

var React      = require('react');
var classNames = require('classnames');

module.exports = React.createClass({
  displayName: 'hui-DatePickerPeriod',

  propTypes: {
    current: React.PropTypes.number,
    value: React.PropTypes.number,
    onChange: React.PropTypes.func
  },

  onChange: function(e) {
    e.preventDefault();
    if (this.props.onChange) {
      this.props.onChange(this.props.value);
    }
  },

  isSelected: function() {
    return this.props.current ===  this.props.value;
  },

  render: function() {
    var classes = classNames({
      'hui-DatePickerPeriod--selected': this.isSelected(),
    }, 'hui-DatePickerPeriod');

    return <a className={ classes } href="#" onClick={ this.onChange }>{ this.props.children } </a>;
  }
});
