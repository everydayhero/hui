'use strict';

var React      = require('react');
var moment     = require('moment');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'hui-DatePickerDay',

  propTypes: {
    date: React.PropTypes.object,
    onClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object
  },

  onClick: function(e) {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(this.props.date);
    }
  },

  isToday: function() {
    return this.props.date && this.props.date.isSame(moment(), 'day');
  },

  isSelected: function() {
    return this.props.date && this.props.date.isSame(this.props.selectedDate, 'day');
  },

  render: function() {
    var classes = classnames({
      'hui-DatePickerDay--today': this.isToday(),
      'hui-DatePickerDay--selected': this.isSelected()
    }, 'hui-DatePickerDay');
    return (
      <a href="#" tabIndex="-1" className={ classes } onClick={ this.onClick } >{ this.props.children }</a>
    );
  }
});
