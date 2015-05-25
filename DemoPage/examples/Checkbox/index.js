"use strict";

var React         = require('react');
var CheckboxInput = require('../../../forms/Checkbox');
var Highlight     = require('react-highlight');
var formMixin     = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'CheckboxExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      join_label: 'Join or not',
      terms_label: 'Terms & Conditions',
      opt_in_label: 'Opt in'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3 className="DemoPage__h3">Checkbox</h3>
      <p className="DemoPage__p">Basic checkbox with label</p>
      <h4 className="DemoPage__h4">Checkbox propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">id: [String] (Optional)</li>
        <li className="DemoPage__li">value: [Boolean] (Default false)</li>
        <li className="DemoPage__li">disabled: [Boolean] (Default true)</li>
        <li className="DemoPage__li">labelIsClickable: [Boolean] (Default false)</li>
        <li className="DemoPage__li">onChange: [Function] On change callabck. Returns true/false. (Optional) </li>
      </ul>
      { this.checkboxInput("opt_in") }
      <CheckboxInput
        id="terms"
        value={ this.state.form.terms }
        label={ "Accepts terms and conditions" }
        onChange={ change("terms") } />

      <CheckboxInput
        id="special"
        value={ this.state.form.special }
        label={ <span>Label with <b>HTML</b> content </span> }
        onChange={ change("special") } />

      <CheckboxInput
        id="no_click"
        value={ this.state.form.no_click }
        label={ <span>A <b>non-clickable</b> label with <b>HTML</b> content </span> }
        onChange={ change("no_click") }
        labelIsClickable={ false } />

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<CheckboxInput\n' }
        { '  id="terms"\n' }
        { '  value={ this.state.form.terms }\n' }
        { '  label="Terms and Conditions"\n ' }
        { '  onChange={ change("terms") } />\n' }
      </Highlight>
    </div>
    );
  }
});
