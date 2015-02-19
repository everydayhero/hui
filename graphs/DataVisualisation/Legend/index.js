"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'Legend',

  propTypes: {
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  labels: function() {
    return this.props.labels.map(function(label) {
      return (
        <div className="LegendItem">
          <div className="LegendItemContent">
            <div className="LegendItem__dot"></div>
            <div className="LegendItem__label">
              { label }
            </div>
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className="Legend">
        { this.labels() }
      </div>
    );
  }
});
