'use strict';

var React      = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'hui-DatePickerPeriod',

  propTypes: {
    current: React.PropTypes.number,
    value: React.PropTypes.number,
    onSelect: React.PropTypes.func
  },

  onSelect: function(e) {
    e.preventDefault();

    if (this.props.onSelect) {
      this.props.onSelect(this.props.value);
    }
  },

  isSelected: function() {
    return this.props.current ===  this.props.value;
  },

  render: function() {
    var classes = classnames({
      'hui-DatePickerPeriod--selected': this.isSelected()
    }, 'hui-DatePickerPeriod');

    return <a className={ classes } tabIndex="-1" href="#" onClick={ this.onSelect }>{ this.props.children } </a>;
  }
});
