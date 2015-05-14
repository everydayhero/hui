"use strict";

var React            = require('react');
var InputErrors      = require('../InputErrors');
var placeholderMixin = require('../../mixins/placeholderMixin');

module.exports = React.createClass({
  displayName: 'hui-TextArea',
  mixins: [placeholderMixin],

  propTypes: {
    onChange: React.PropTypes.func,
    value: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      file: this.props.value
    };
  },

  handleChange: function(e) {
    var props = this.props;
    if(props.onChange) {
      this.props.onChange(e.target.value);
    }
  },

  render: function() {
    var props = this.props;
    var classes = 'hui-TextArea ' + (props.className || '');

    return (
      <span >
        { this.renderPlaceholder() }
        <textarea className={ classes }
          id={ props.id }
          value={ props.value }
          onChange={ this.handleChange }>
        </textarea>
        <InputErrors errors={ props.errors } />
      </span>
    );
  }
});
