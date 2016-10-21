'use strict'

import React from 'react'
import Button from '../../buttons/Button'

export default React.createClass({
  displayName: 'UserAuth',

  propTypes: {
    signInUrl: React.PropTypes.string.isRequired,
    signUpUrl: React.PropTypes.string.isRequired,
    signInLabel: React.PropTypes.string,
    signUpLabel: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      signInLabel: 'Sign In',
      signUpLabel: 'Sign Up'
    }
  },

  render: function () {
    var props = this.props

    return (
      <div className='hui-UserAuth'>
        <Button label={props.signUpLabel} thin kind='cta' href={props.signUpUrl} />
        <a className='hui-UserAuth__signIn' href={props.signInUrl} >
          { props.signInLabel }
        </a>
      </div>
    )
  }
})
