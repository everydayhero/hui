'use strict';

var React      = require('react/addons');
var Icon       = require('../../../atoms/Icon');

module.exports = React.createClass({
  displayName: 'TagListItem',

  propTypes: {
    item: React.PropTypes.object,
    icon: React.PropTypes.string,
    onIconClick: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      item: {},
      icon: 'remove',
      onIconClick: null
    };
  },

  onClick: function(e) {
    var props = this.props;
    var onIconClick = props.onIconClick;
    e.preventDefault();

    return onIconClick && onIconClick(props.item);
  },

  renderIcon: function() {
    var props = this.props;
    var icon = props.icon;

    return icon && (
      <button id={ props.item.id } className="hui-TagListItem__iconButton" onClick={ this.onClick }>
        <Icon icon={ icon } fixedWidth={ true } />
      </button>
    );
  },

  render: function() {
    var props = this.props;

    return (
      <div className="hui-TagListItem">
        <div className="hui-TagListItem__label">
          { props.item.name }
          { this.renderIcon() }
        </div>
      </div>
    );
  }
});
