'use strict';

var React  = require('react');
var Icon = require('../../atoms/Icon');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Progress',

  getDefaultProps: function() {
    return {
      total: 1,
      active: 0
    }
  },

  onChange: function(index) {
    var onChange = this.props.onChange;
    return function(e) {
      e.preventDefault();
      onChange && onChange(index);
    }
  },

  renderItems: function() {
    var items = [];
    var total = this.props.total;
    var index = 0;

    while(index < total && total !== 0) {
      var icon = index > this.props.active ? 'circle-thin' : 'circle';
      var classes = classnames([
        'hui-Progress__item',
        (index === this.props.active) && 'hui-Progress__item--active'
      ]);

      items.push(
        <a href="#" key={ index } className={ classes } onClick={ this.onChange(index) }>
          <Icon icon={ icon }/>
        </a>
      );

      index++;
    }

    return items;
  },

  render: function() {
    return (
      <div className="hui-Progress">
        { this.renderItems() }
      </div>
    );
  }
});
