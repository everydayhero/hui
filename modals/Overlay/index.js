'use strict';

var React = require('react');
var Icon  = require('../../atoms/Icon');

module.exports = React.createClass({
  displayName: 'Overlay',

  getDefaultProps: function() {
    return {
      open: false
    }
  },

  render: function() {
    var props = this.props;
    if (!props.open) {
      return null;
    }

    return (
      <div className="hui-Overlay">
        <div className="hui-Overlay__wrapper">
        <a href="#" onClick={ this.props.onClose } className="hui-Overlay__close">
          <Icon icon="times"/>
        </a>
        { props.children }
        </div>
      </div>
    );
  }
});
