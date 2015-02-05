/** @jsx React.DOM */
"use strict";

var React   = require('react');

module.exports = React.createClass({
  displayName: 'Masthead',

  propTypes: {
    href: React.PropTypes.string,
    appName: React.PropTypes.string,
    srcSvg: React.PropTypes.string,
    srcGif: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      root: '/'
    };
  },

  renderLogo: function() {
    var alt = ["everydayhero", this.props.appName].join(' ');

    if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
      return (
        <img
          className="hui-Masthead__logo"
          src={ this.props.srcSvg }
          alt={ alt } />
        );
    } else {
      return (
        <img
          className="hui-Masthead__logo"
          src={ this.props.srcGif }
          alt={ alt } />
        );
    }
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
    return (
      <h1 className="hui-Masthead">
        <a href={ this.props.href }>
          { this.renderLogo() }
          { this.renderAppName() }
        </a>
      </h1>
    );
  }
});
