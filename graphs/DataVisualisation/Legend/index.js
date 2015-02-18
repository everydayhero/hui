"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'Legend',

  propTypes: {
    titles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  titles: function() {
    return this.props.titles.map(function(title) {
      return (
        <div className="LegendItem">
          <div className="LegendItemContent">
            <div className="LegendItem__dot"></div>
            <div className="LegendItem__text">
              { title }
            </div>
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className="Legend">
        { this.titles() }
      </div>
    );
  }
});
