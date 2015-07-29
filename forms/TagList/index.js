'use strict';

var React    = require('react/addons');
var ListItem = require('./Item');

module.exports = React.createClass({
  displayName: 'TagList',

  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })).isRequired
  },

  onDeleteItem: function() {
    console.log('delete Item .......');
  },

  renderItems: function() {
    var items = this.props.items || [];
    var onIconClick = this.onDeleteItem;

    return items.map(function(item) {
      return <ListItem item={ item } onIconClick={ onIconClick } />;
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
