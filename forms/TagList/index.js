'use strict';

var React    = require('react/addons');
var ListItem = require('./Item');
var _        = require('lodash');

module.exports = React.createClass({
  displayName: 'TagList',

  propTypes: {
    onItemRemoved: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })).isRequired
  },

  getInitialState: function() {
    return {
      items: this.props.items
    };
  },

  onRemoveItem: function(data) {
    var props     = this.props,
    onItemRemoved = props.onItemRemoved,
    elements      = props.items;

    _.remove(elements, function(elem) {
      return elem.id === data.id;
    });

    this.setState({ items: elements });

    return onItemRemoved && onItemRemoved(elements);
  },

  renderItems: function() {
    var state       = this.state;
    var items       = state.items || [];
    var onIconClick = this.onRemoveItem;
    items           = _.uniq(items, 'id');

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
