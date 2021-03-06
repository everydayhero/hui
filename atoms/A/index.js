'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'A',

  propTypes: {
    href: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onClick: function () {}
    }
  },

  handleClick: function (e) {
    this.props.onClick(e)
  },

  render: function () {
    return (
      <a href={this.props.href} className={'hui-A ' + this.props.className} onClick={this.handleClick}>
        { this.props.children }
      </a>
    )
  }
})
