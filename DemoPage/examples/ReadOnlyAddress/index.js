"use strict";

var React           = require('react');
var Highlight       = require('react-highlight');
var ReadOnlyAddress = require('../../../forms/ReadOnlyAddress');
var formMixin       = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'ReadOnlyAddressExample',
  mixins: [formMixin],

  componentDidMount: function() {
    this.setState({
      form: {
        charity_address: {
          street_address: '333 Ann Street',
          street_address_2: '',
          locality: 'Brisbane',
          region: 'QLD',
          postal_code: '4116',
          country_name: 'Australia'
        }
      }
    });
  },

  t: function(name) {
    var translation = {
      charity_address_label: 'Charity Address:',
      charity_address_hint: 'This is a read only field',
      charity_address_tip: 'You can copy, but not edit this input.'
    };

    return (translation[name]);
  },

  render: function() {
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
      <h3 className="DemoPage__h3">ReadOnlyAddress</h3>
      <p className="DemoPage__p">Read only address input (Contactinates address values with ",".</p>
      <h4 className="DemoPage__h4">ReadOnlyAddress propTypes (See TextInput)</h4>
      { this.readOnlyAddress("charity_address") }
      <ReadOnlyAddress id={ name } value={ address } />

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<ReadOnlyAddress\n' }
        { '  id={ name }\n' }
        { '  value={ this.state.form[name] } />\n' }
      </Highlight>
    </div>
    );
  }
});
