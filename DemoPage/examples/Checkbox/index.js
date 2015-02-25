/** @jsx React.DOM */
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
      terms_label: 'Terms & Conditions'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;
    var name   = 'terms';

    return (
    <div>
      <h3>Checkbox</h3>
      <p>Basic checkbox.</p>
      <h4>Checkbox propTypes</h4>
      <ul>
        <li>id:</li>
        <li>value:</li>
        <li>key:</li>
        <li>valid:</li>
        <li>labelIsClickable:</li>
        <li>labelContainsHtml:</li>
        <li>onChange:</li>
      </ul>
      <div className="DemoPage__example">
        { this.checkboxInput('join') }
        <CheckboxInput
          id={ name }
          value={ this.state.form[name] }
          label={ this.t( name + '_label') }
          onChange={ change(name) }
          key={ name } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.checkboxInput('join') }\n" }
        { '<CheckboxInput\n' }
        { '  id={ name }\n' }
        { '  value={ this.state.form[name] }\n' }
        { "  label={ this.t( name + '_label') }\n" }
        { '  onChange={ change(name) }\n' }
        { '  key={ name } />\n' }
      </Highlight>
    </div>
    );
  }
});
