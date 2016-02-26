'use strict'

import React      from 'react'
import classnames from 'classnames'

export default React.createClass({
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
