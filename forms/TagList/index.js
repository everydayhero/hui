'use strict';

var React           = require('react/addons');
var ListItem        = require('./Item');
var _               = require('lodash');
var classNamesArray = require('../../lib/classNamesArray');

module.exports = React.createClass({
  displayName: 'TagList',

  propTypes: {
    onItemIconClicked: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })).isRequired,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      layout: 'full',
      spacing: 'loose'
    };
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
    var props   = this.props;
    var classes = classNamesArray([
      'hui-TagList--' + props.layout,
      'hui-TagList--' + props.spacing,
      'hui-TagList'
    ]);

    return (
      <div className={ classes }>
        <div className="TagList__list">
          { this.renderItems() }
        </div>
      </div>
    );
  }
});
