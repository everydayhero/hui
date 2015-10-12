'use strict';

var _      = require('lodash');
var React  = require('react');

module.exports = React.createClass({
  displayName: 'FlagIcon',

  propTypes: {
    className: React.PropTypes.string,
    country: React.PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      country: ''
    }
  },

  render: function() {
    var classes = _.compact(['hui-FlagIcon', this.props.className]).join(' ');

    return (
      <span className={ classes }>
        <i className={ 'hui-Flag hui-Flag-' + (!!this.props.country && this.props.country.toLowerCase()) } />
      </span>
    );
  }
});
