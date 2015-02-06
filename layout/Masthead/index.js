/** @jsx React.DOM */
"use strict";

var React = require('react');
var hasSvgFeature = false;

if (document) {
  hasSvgFeature = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}

var fileType = hasSvgFeature ? 'svg' : 'gif';
var LOGO_FILE_NAME = 'hui_edh_logo.';

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

  renderLogo: function() {
    var alt = ["everydayhero", this.props.appName].join(' ');

    return (
      <img
        className="hui-Masthead__logo"
        src={ this.props.imagePath + LOGO_FILE_NAME + fileType }
        alt={ alt } />
    );
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
