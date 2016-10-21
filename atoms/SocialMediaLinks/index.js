'use strict'

import React from 'react'
import Icon from '../Icon'

export default React.createClass({
  displayName: 'SocialMediaLinks',

  propTypes: {
    links: React.PropTypes.array.isRequired,
    className: React.PropTypes.string,
    linkClass: React.PropTypes.string
  },

  renderLinks: function () {
    var linkClass = this.props.linkClass
    return this.props.links.map(function (d) {
      var classes = ['hui-SocialMediaLinks__link', d.name, linkClass].join(' ')
      return !!d.url && (
        <a href={d.url} key={d.url}>
          <Icon className={classes} icon={d.name} />
        </a>
        )
    })
  },

  render: function () {
    return (
      <div className={'hui-SocialMediaLinks ' + this.props.className}>
        { this.renderLinks() }
      </div>
    )
  }
})
