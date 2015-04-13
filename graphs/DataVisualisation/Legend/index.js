"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'Legend',

  propTypes: {
    labels: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string,
      className: React.PropTypes.string
    })).isRequired
  },

  labels: function() {
    return this.props.labels.map(function(label) {
      var givenClassName = ' ' + label.className || '';
      return (
        <div className={ 'hui-Legend__item' + givenClassName }>
          <div className="hui-Legend__content">
            <div className="hui-Legend__dot"></div>
            <div className="hui-Legend__label">
              { label.text }
            </div>
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className="hui-Legend">
        { this.labels() }
      </div>
    );
  }
});
