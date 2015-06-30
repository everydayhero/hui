"use strict";
/**
* This Mixin can only be called in/after ComponentDidMount(), as
* getDOMNode() is unavailable until after the component is rendered.
*/

var _ = require('lodash');
var locals = require('../../locals');
var breakpoints = {
  phone: 450,
  tablet: 700,
  laptop: 950,
  desktop: 1200
};
var sizes = {
  tiny: 200,
  small: 350,
  medium: 500,
  large: 650
};

var resizeHandlers = [];

if (locals.IS_CLIENT) window.addEventListener('resize', function(e) {
  resizeHandlers.forEach(function(handler) {
    handler(e);
  });
}, false);

function findSize(o, w) {
  return _.findKey(o, function(d) {
    return w < d;
  });
}

module.exports = {
  getInitialState: function() {
    return {
      size: 'medium',
      device: locals.device
    };
  },

  componentDidMount: function() {
    resizeHandlers.push(this.setSizeAndDevice);
    this.setSizeAndDevice();
  },

  componentWillUnmount: function() {
    _.pull(resizeHandlers, this.setSizeAndDevice);
  },

  getChildrenWidth: function(min_width, count) {
    var child_count = Math.min(count, this.getChildCountFromWidth(min_width));
    return this.getChildWidth(child_count);
  },

  getChildWidth: function(count) {
    return Math.floor(10000 / Math.max(1, count)) * 0.01 + '%';
  },

  getChildCountFromWidth: function(min_width) {
    return Math.max(1, Math.floor(this.getComponentWidth() / min_width));
  },

  getDeviceFallback: function(device, obj) {
    var devices = ['phone', 'tablet', 'laptop', 'desktop', 'tv'],
        length = devices.length,
        i = devices.indexOf(device),
        fallback,
        inc = 0;
    while (!fallback && inc++ <= length) {
      fallback = obj[devices[i - inc]] || obj[devices[i + inc]];
    }
    return fallback;
  },

  setSizeAndDevice: function() {
    var size = this.getSize();
    var device = this.getDevice();
    if (size !== this.state.size || device !== this.state.device) {
      this.setState({
        size: size,
        device: device
      });
    }
  },

  getWindowWidth: function() {
    return document.body.clientWidth;
  },

  getComponentWidth: function () {
    return this.getDOMNode().offsetWidth || 0;
  },

  getDevice: function() {
    var w = this.getWindowWidth();
    return findSize(breakpoints, w) || 'tv';
  },

  getSize: function() {
    var w = this.getComponentWidth();
    return findSize(sizes, w) || 'huge';
  }
};
