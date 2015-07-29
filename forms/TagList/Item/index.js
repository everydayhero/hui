'use strict';

var React      = require('react/addons');
var classnames = require('classnames');
var Icon       = require('../../../atoms/Icon');

module.exports = React.createClass({
  displayName: 'TagListItem',

  propTypes: {
    item: React.PropTypes.object,
    icon: React.PropTypes.string,
    iconPosition: React.PropTypes.string,
    onIconClick: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      item: {},
      icon: 'remove',
      iconPosition: 'right',
      onIconClick: null
    };
  },

  renderIcon: function() {
    var props = this.props;
    var className = classnames({
      'hui-TagListItem__icon': true,
      'hui-TagListItem__icon--right': (props.iconPosition === 'right'),
      'hui-TagListItem__iconButton': props.onIconClick
    });
    var icon = props.icon;

    return icon && (
      <button className={ className } onClick={ props.onIconClick }>
        <Icon icon={ icon } fixedWidth={ true } />
      </button>
    );
  },

  render: function() {
    var props = this.props;

    return (
      <div className="hui-TagListItem">
        <label className="hui-TagListItem__label">
          { props.item.name }
          { this.renderIcon() }
        </label>
      </div>
    );
  }
});
