"use strict";

var React = require('react');

module.exports = {

  hasValue: function() {
    return !!this.props.value;
  },

  renderPlaceholder: function() {
    var placeholder = this.getPlaceholder();

    if (!this.hasValue() && placeholder) {
      return <label htmlFor={ this.props.id } className={ this.constructor.displayName + '__placeholder' }>{ placeholder }</label>;
    } else {
      return null;
    }
  },

  getPlaceholder: function() {
    var props = this.props;

    if (props.label) {
      console.warn('The prop `label` for ' + this.constructor.displayName + ' is deprecated. Use `placeholder` instead.');
      return props.label;
    }

    return props.placeholder;
  },
};
