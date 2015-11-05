'use strict'

var React     = require('react')
var Button    = require('../Button')
var openPopup = require('../../lib/openPopup')
var format    = require('../../lib/format')
var serviceConfigs = {
  facebook: {
    name: 'facebook',
    url: 'http://www.facebook.com/sharer.php?u={url}',
    icon: 'facebook'
  },
  twitter: {
    name: 'twitter',
    url: 'https://twitter.com/share?url={url}&text={title}',
    icon: 'twitter'
  },
  googleplus: {
    name: 'googleplus',
    url: 'https://plus.google.com/share?url={url}',
    icon: 'google-plus'
  },
  pinterest: {
    name: 'pinterest',
    url: 'https://pinterest.com/pin/create/bookmarklet/?media={img}&url={url}&description={title}',
    icon: 'pinterest'
  }
}

module.exports = React.createClass({
  displayName: 'Share',
  propTypes: {
    kind: React.PropTypes.oneOf([
      'facebook',
      'twitter',
      'googleplus',
      'pinterest'
    ]).isRequired
  },

  getDefaultProps: function() {
    let window = typeof window !== 'undefined' ? window : null
    let document = typeof document !== 'undefined' ? document : null

    return {
      shareUrl: (!!window && window.location.href) || '',
      shareTitle: (!!document && document.title) || '',
      shareImage: ''
    }
  },

  openFacebookShare: function() {
    var { shareUrl, onComplete } = this.props

    window.FB.ui({
      method: 'share',
      href: shareUrl
    }, onComplete)
  },

  onClick: function() {
    var {
      kind,
      shareUrl,
      shareTitle,
      onComplete,
      shareImage
    } = this.props
    var service = serviceConfigs[kind]
    var popUpConfig = {
      toolbar: 0,
      status: 0,
      width: 640,
      height: 320
    }
    var urlParams = {
      'url': encodeURIComponent(shareUrl),
      'title': shareTitle,
      'img': shareImage
    }
    var url = format(service.url, urlParams, true)

    if (typeof window.FB === 'object' && kind === 'facebook') {
      this.openFacebookShare()
    } else {
      openPopup(url, popUpConfig, onComplete)
    }
  },

  render: function() {
    var props = this.props
    var service = serviceConfigs[props.kind]

    return (
      <Button {...props} kind={ props.kind } icon={ service.icon } onClick={ this.onClick }>
        { props.label || service.name }
      </Button>
    )
  }
})
