"use strict";

var React           = require('react');
var Highlight       = require('react-highlight');
var ReadOnlyAddress = require('../../../forms/ReadOnlyAddress');
var formMixin       = require('../../../mixins/reactForm.mixin');

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
    var address = {
      street_address: '333 Ann Street',
      street_address_2: '',
      locality: 'Brisbane',
      region: 'QLD',
      postal_code: '4116',
      country_name: 'Australia'
    };

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
        { this.readOnlyAddress('charity_address', { helpText: false }) }
        <ReadOnlyAddress
            id={ name }
            value={ address }
            onChange={ change(name) } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.readOnlyAddress('charity_address', { helpText: false }) } \n" }
        { '<ReadOnlyAddress\n' }
        { '  id={ name }\n' }
        { '  value={ this.state.form[name] }\n' }
        { '  onChange={ change(name) } />\n' }
      </Highlight>
    </div>
    );
  }
});
