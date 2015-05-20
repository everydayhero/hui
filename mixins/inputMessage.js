"use strict";

var React      = require('react');
var InputErrors = require('../forms/InputErrors');

module.exports = {
  onTab: function(e) {
    var props = this.props;
    if(e.key === 'Tab') {
      props.onTab && props.onTab(props.value);
    }
  },

  shouldShowError: function() {
    var props = this.props;

    return this.state.hasError || props.errors.length || props.showError;
  },

  renderMessage: function(hasMessage) {
    var props = this.props;
    var errors = [];
    var message;

    if (!hasMessage) {
      return;
    }

    errors = this.state.hasError ? [props.errorMessage] : props.errors;

    if (errors.length > 0) {
      message = (<InputErrors errors={ errors } />);
    } else {
      message = this.props.hint;
    }

    return (
      <div className="hui-TextInput__message">
        { message }
      </div>
    );
  },
};
