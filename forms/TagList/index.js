'use strict';

var React    = require('react/addons');
var ListItem = require('./Item');
var _        = require('lodash');

module.exports = React.createClass({
  displayName: 'TagList',

  propTypes: {
    onItemIconClicked: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })).isRequired
  },

  onClickItemIcon: function(data) {
    var props         = this.props,
    onItemIconClicked = props.onItemIconClicked,
    elements          = props.items;

    _.remove(elements, function(elem) {
      return elem.id === data.id;
    });

    return onItemIconClicked && onItemIconClicked(elements);
  },

  renderItems: function() {
    var items       = this.props.items || [];
    var onIconClick = this.onClickItemIcon;

    return !_.isEmpty(items) && items.map(function(item) {
      return <ListItem key={ item.id } item={ item } onIconClick={ onIconClick } />;
    });
  },

  render: function() {
    return (
      <div className="TagList">
        <div className="TagList__list">
          { this.renderItems() }
        </div>
      </div>
    );
  }
});
