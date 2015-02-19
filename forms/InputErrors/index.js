"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'InputErrors',

  render: function() {
    var errors     = this.props.errors;
    var ErrorsList = [];

    if (errors && errors.length > 0) {
      for (var i = 0; i < errors.length; i++) {
        ErrorsList.push(<li> { errors[i] } </li>);
      }

      return <ul className="hui-InputErrors"> { ErrorsList } </ul>;
    }

    return false;
  }
});
