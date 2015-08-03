'use strict';

var React = require('react');
var Icon  = require('../../atoms/Icon');
var orginalOverflowY;
var body;
var document = document || false;

module.exports = React.createClass({
  displayName: 'Overlay',

  getDefaultProps: function() {
    return {
      open: false
    }
  },

  componentWillMount: function() {
    if(document) {
      body = document.getElementsByTagName('body')[0];
      orginalOverflowY = body.style.overflowY;
    }
  },

  render: function() {
    var props = this.props;
    if (!props.open) {
      if(document) { body.style.overflowY = orginalOverflowY; }
      return null;
    }

    if(document) { body.style.overflowY = 'hidden'; }

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
