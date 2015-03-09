"use strict";

var React  = require('react');
var Button = require('../../buttons/Button');

module.exports = React.createClass({
  displayName: 'UserAuth',

  propTypes: {
    signInHref: React.PropTypes.string.isRequired,
    signUpHref: React.PropTypes.string.isRequired,
    signInLabel: React.PropTypes.string,
    signUpLabel: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      signInLabel: 'Sign In',
      signUpLabel: 'Sign Up'
    };
  },

  render: function() {
    var props = this.props;

    return (
      <div className="hui-UserAuth">
        <Button label={ props.signUpLabel } thin={ true } kind="cta" href={ props.signUpHref }/>
        <a className="hui-UserAuth__signIn" href={ props.signInHref } >
          { props.signInLabel }
        </a>
      </div>
    );
  }
});
