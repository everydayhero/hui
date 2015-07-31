'use strict';

var React           = require('react');
var Icon            = require('../../atoms/Icon');
var classNamesArray = require('../../lib/classNamesArray');

module.exports = React.createClass({
  displayName: 'Progress',

  getDefaultProps: function() {
    return {
      total: 1,
      active: 1
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
      var classNames = classNamesArray([
        'hui-Progress__item',
        (index === this.props.active) && 'hui-Progress__item--active'
      ]);

      items.push(
        <a href="#" key={ index }className={ classNames } onClick={ this.onChange(index) }>
          <Icon icon="circle"/>
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
