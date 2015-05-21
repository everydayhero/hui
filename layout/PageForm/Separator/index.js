"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'Separator',

  propTypes: {
    color: React.PropTypes.oneOf(['white', 'grey', 'green'])
  },

  getDefaultProps: function() {
    return {
      color: 'green'
    };
  },

  render: function() {
    return (  
      <hr className={ 'Separator ' + this.props.color }/>
    );
  }
});
