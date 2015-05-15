"use strict";

var React     = require('react');
var TextInput = require('../../../forms/TextInput');
var Highlight = require('react-highlight');
var formMixin = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'TextInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      user_name_label: 'User Name:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3 className="DemoPage__h3">TextInput</h3>
      <p className="DemoPage__p">Basic text input.</p>
      <h4 className="DemoPage__h4">TextInput propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">readOnly:</li>
        <li className="DemoPage__li">type:</li>
        <li className="DemoPage__li">autoComplete:</li>
        <li className="DemoPage__li">value:</li>
        <li className="DemoPage__li">required:</li>
        <li className="DemoPage__li">label:</li>
        <li className="DemoPage__li">validate:</li>
        <li className="DemoPage__li">errorMessage:</li>
        <li className="DemoPage__li">spacing:</li>
        <li className="DemoPage__li">serverErrors:</li>
        <li className="DemoPage__li">onBlur:</li>
        <li className="DemoPage__li">onChange:</li>
      </ul>
      <div className="DemoPage__example">
        { this.textInput('user_name', { label: 'User Name', hint: 'This is the hint', helpText: 'This is the help text' }) }
        <TextInput
          autoComplete="off"
          id='demo_input'
          value={ this.state.form.demo_input }
          required={ true }
          errorMessage='This field cannot be left blank'
          label='A required field'
          onChange={ change('demo_input') } />
        <TextInput
          autoComplete="off"
          id='demo_input'
          value='invalid@email'
          serverErrors={ ['invalid email address', 'correctly wrong'] }
          label='invalid email address'
          onChange={ change('demo_input') } />
        <TextInput
          autoComplete="off"
          id='demo_input'
          value="This is some content"
          label='Label with hint'
          hint='this is the hint'
          onChange={ change('demo_input') } />
        <TextInput
          id='demo_input_readonly'
          value="This is a readonly text input"
          readOnly={ true } />
      </div>

      <h4 className="DemoPage__h3">React Example</h4>
      <Highlight className='html'>
        { "{ this.textInput('user_name', { hint: 'This is the hint' }, helpText: 'This is the help text') }\n" }
        { '<TextInput\n' }
        { '  autoComplete="off"\n' }
        { '  id={ props.id }\n' }
        { '  value={ props.domain + value }\n' }
        { '  required={ true }\n' }
        { "  errorMessage='This field cannot be left blank'\n" }
        { "  label='This field is required'\n" }
        { "  onChange={ change('demo_input') } />\n" }
      </Highlight>
    </div>
    );
  }
});
