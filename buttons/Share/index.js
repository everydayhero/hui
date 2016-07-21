'use strict'

import React     from 'react'
import Button    from '../Button'
import openPopup from '../../lib/openPopup'
import format    from '../../lib/format'

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

export default React.createClass({
  displayName: 'Share',
  propTypes: {
    kind: React.PropTypes.oneOf([
      'facebook',
      'twitter',
      'googleplus',
      'pinterest'
    ]).isRequired,
    action: React.PropTypes.shape({
      type: React.PropTypes.string,
      properties: React.PropTypes.object
    })
  },

  getDefaultProps: function() {
    let window = typeof window !== 'undefined' ? window : null
    let document = typeof document !== 'undefined' ? document : null

    return {
      shareUrl: (!!window && window.location.href) || '',
      shareTitle: (!!document && document.title) || '',
      shareImage: '',
      action: null
    }
  },

  openFacebookShare: function() {
    let payload = {}
    const { shareUrl, action, onComplete } = this.props
    if (action && action.type) {
      payload.method = action.method || 'share_open_graph'
      payload.action_type = action.type,
      payload.action_properties = JSON.stringify(action.properties)
    } else {
      payload.method = 'share'
      payload.href = shareUrl
    }
    window.FB.ui(payload, onComplete)
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
