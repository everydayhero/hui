"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'Masthead',

  propTypes: {
    href: React.PropTypes.string,
    appName: React.PropTypes.string,
    imagePath: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      root: '/'
    };
  },

  renderAppName: function() {
    var appName = this.props.appName;

    if (appName) {
      return (
          <span className="hui-Masthead__appName">
            { appName }
          </span>
        );
    } else {
      return false;
    }
  },

  render: function() {
    var alt = ["everydayhero", this.props.appName].join(' ');

    return (
      <h1 className="hui-Masthead">
        <a href={ this.props.href }>
          <img
            className="hui-Masthead__logo--desktop"
            src={ this.props.imagePath + 'hui_edh_logo@x2.gif' }
            alt={ alt } />
          <img
            className="hui-Masthead__logo--mobile"
            src={ this.props.imagePath + 'hui_edh_mark@x2.gif' }
            alt={ alt } />
          { this.renderAppName() }
        </a>
      </h1>
    );
  }
});
