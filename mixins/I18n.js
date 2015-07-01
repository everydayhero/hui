"use strict";

var _ = require('lodash');
var React = require('react');
var i18n = require('../lib/i18n');
var Remarkable = require('remarkable');
var md = new Remarkable({ xhtmlOut: true, breaks: true });

module.exports = {
  t: function(key, params) {
    return i18n.t(this.constructor.i18n, key, params);
  },

  tm: function(key, params) {
    return (
      <span dangerouslySetInnerHTML={{
        __html: md.render(this.t(key, params))
      }} />
    );
  }
};
