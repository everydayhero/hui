"use strict";

var React     = require('react');
var UrlInput  = require('../../../forms/UrlInput');
var Highlight = require('react-highlight');
var formMixin = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'UrlInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      website_url_label: 'Website Url:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;
    var url = 'redirect_url';

    return (
    <div>
      <h3>UrlInput</h3>
      <p>Url input.</p>
      <h4>UrlInput propTypes</h4>
      <ul>
        <li>errors:</li>
        <li>placeholder:</li>
        <li>readOnly:</li>
        <li>type:</li>
        <li>className:</li>
        <li>autoComplete:</li>
        <li>value:</li>
        <li>onBlur:</li>
        <li>onChange:</li>
      </ul>
      <div className="DemoPage__example">
        { this.urlInput('website_url', 'example.com') }
        <UrlInput
          id={ url }
          onChange={ change(url) }
          value={ this.state.form[url] }
          placeholder={ 'www.example.com' }
          errors={ this.props.errors && this.props.errors[url] } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.urlInput('website_url', 'example.com') }\n" }
        { '<UrlInput\n' }
        { '  id={ url }\n' }
        { '  onChange={ change(url) }\n' }
        { '  value={ this.state.form[url] }\n' }
        { "  placeholder={ 'www.example.com' }\n" }
        { '  errors={ this.props.errors && this.props.errors[url] } />\n' }
      </Highlight>
    </div>
    );
  }
});
