"use strict";

var React     = require('react');
var UrlInput  = require('../../../forms/UrlInput');
var formMixin = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'UrlInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      website_url_label: 'Website Url:',
      website_url_tip: 'past your url here.',
      website_url_hint: 'you can even past the http part!'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;
    var url = 'redirect_url';

    return (
    <div>
      <h3 className="DemoPage__h3" id="UrlInput">UrlInput</h3>

      { this.urlInput("website_url") }

      <UrlInput
        id={ url }
        onChange={ change(url) }
        value={ this.state.form[url] }
        placeholder={ 'www.example.com' }
        errors={ this.props.errors && this.props.errors[url] } />
    </div>
    );
  }
});
