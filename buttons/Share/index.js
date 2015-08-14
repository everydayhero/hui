'use strict';

var React     = require('react');
var Button    = require('../Button');
var openPopup = require('../../lib/openPopup');
var format    = require('../../lib/format');
var serviceConfigs = {
  facebook: {
    name: 'facebook',
    url: 'http://www.facebook.com/sharer.php?u={url}',
    icon: 'facebook'
  },
  twitter: {
    name: 'twitter',
    url: 'https://twitter.com/share?url={url}&text={title}'
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
};

module.exports = React.createClass({
  displayName: 'Share',
  propTypes: {
    kind: React.PropTypes.oneOf(['facebook', 'twitter', 'googleplus', 'pinterest']).isRequired
  },

  getDefaultProps: function() {
    var window = window || false;
    var document = document || false;

    return {
      shareUrl: window ? window.location.href : '',
      shareTitle: document ? document.title : '',
      shareImage: ''
    };
  },

  openFacebookShare: function() {
    var props = this.props;
    window.FB.ui({
      method: 'share',
      href: this.props.shareUrl
    }, props.onComplete);
  },

  handleClick: function() {
    var props = this.props;
    var service = serviceConfigs[props.kind];
    var popUpConfig = {
      toolbar: 0,
      status: 0,
      width: 640,
      height: 320
    };
    var urlParams = {
      'url': props.shareUrl || window.location.href,
      'title': props.shareTitle || document.title,
      'img': props.shareImage
    };
    var url = format(service.url, urlParams, true);

    if (typeof window.FB === 'object' && props.kind === 'facebook') {
      this.openFacebookShare();
    } else {
      openPopup(url, popUpConfig, props.onComplete);
    }
  },

  render: function() {
    var props = this.props;

    return (
      <Button kind={ serviceConfigs[props.kind].name } icon={ props.kind } onClick={ this.handleClick }>
        { props.label || serviceConfigs[props.kind].name }
      </Button>
    );
  }
});
