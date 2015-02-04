/** @jsx React.DOM */
"use strict";

var React   = require('react');
var assests = require('../../../mixins/assests');

module.exports = React.createClass({
  displayName: 'Masthead',
  mixins: [assests],

  propTypes: {
    routes: React.PropTypes.object,
    applicationName:React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      root: '/'
    }
  },

  renderLogo: function() {
    var alt = ["everydayhero", this.props.applicationName].join(' ');

    if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
      return (
        <img
          className="UIlib-Masthead__logo"
          src={ this.assestPath('edh_logo.svg') }
          alt={ alt } />
        );
    } else {
      return (
        <img
          className="UIlib-Masthead__logo"
          src={ this.assestPath('edh_logo_32x180.gif') }
          alt={ alt } />
        );
    }
  },

  renderAppName: function() {
    var applicationName = this.props.applicationName;

    if (applicationName) {
      return (
          <span className="UIlib-Masthead__applicationName">
            { applicationName }
          </span>
        );
    } else {
      return false;
    }
  },

  render: function() {
    var routes = this.props.routes;

    return (
      <h1 className="UIlib-Masthead">
        <a href={ this.props.root }>
          { this.renderLogo() }
          { this.renderAppName() }
        </a>
      </h1>
    );
  }
});
