/** @jsx React.DOM */
"use strict";

var React           = require('react');
var Highlight       = require('react-highlight');
var ReadOnlyAddress = require('../../forms/ReadOnlyAddress');
var formMixin       = require('../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'ReadOnlyAddressExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      charity_address_label: 'Charity Address:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;
    var name   = 'edh_address';

    return (
    <div>
      <h3>ReadOnlyAddress</h3>
      <p>ReadOnlyAddress.</p>
      <h4>ReadOnlyAddress propTypes</h4>
      <ul>
        <li>id:</li>
        <li>value:</li>
        <li>onChange:</li>
      </ul>
      <div className="DemoPage__example">
        { this.readOnlyAddress('charity_address', { hint: false }) }
        <ReadOnlyAddress
            id={ name }
            value={ this.state.form[name] }
            onChange={ change(name) } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.readOnlyAddress('charity_address', { hint: false }) } \n" }
        { '<ReadOnlyAddress\n' }
        { '  id={ name }\n' }
        { '  value={ this.state.form[name] }\n' }
        { '  onChange={ change(name) } />\n' }
      </Highlight>
    </div>
    );
  }
});
