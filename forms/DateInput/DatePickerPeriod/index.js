"use strict";

var React  = require('react');
var cx     = require('react/lib/cx');

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
    var classes = cx({
      'hui-DatePickerPeriod': true,
      'hui-DatePickerPeriod--selected': this.isSelected(),
    });

    return <a className={ classes } href="#" onClick={ this.onClick }>{ this.props.children } </a>;
  }
});
