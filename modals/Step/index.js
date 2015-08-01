'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Step',

  render: function() {
    return (
      <div className="hui-Step">
        { this.props.children }
      </div>
    );
  }
});
