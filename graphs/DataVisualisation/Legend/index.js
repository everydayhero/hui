'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Legend',

  propTypes: {
    keys: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string,
      className: React.PropTypes.string
    })).isRequired
  },

  keys: function() {
    return this.props.keys.map(function(key) {
      var givenClassName = ' ' + key.className || '';
      return (
        <div className={ 'hui-Legend__item' + givenClassName }>
          <div className="hui-Legend__content">
            <div className="hui-Legend__dot"></div>
            <div className="hui-Legend__label">
              { key.label }
            </div>
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className="hui-Legend">
        { this.keys() }
      </div>
    );
  }
});
