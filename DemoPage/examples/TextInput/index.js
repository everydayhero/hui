"use strict";

var React              = require('react');
var TextCountDownInput = require('../../../forms/TextCountDownInput');
var TextInput          = require('../../../forms/TextInput');
var Highlight          = require('react-highlight');
var formMixin          = require('../../../mixins/reactForm.mixin');

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
        <li className="DemoPage__li"><span className="DemoPage__bold">autoComplete:</span> [Boolean] – Allow browser auto complete to fill input (Default true)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">storeLocally:</span> [Boolean] – Store input values local to restore on page refresh (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">autoFocus:</span> [Boolean] – Set focus on input on render (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">disabled:</span> [Boolean] – Disable input (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">showError:</span> [Boolean] – Force errors to be displayed (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">name:</span> [String] - Field name (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">serverErrors:</span> [Array] - List of error message returned from server (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">errorMessage:</span> [String] – Message defined by client side validation to display on validation error (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">hint:</span> [String] – Text to display under input on feild focus (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">icon:</span> [String] – Icon to appear on the right of the input (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">mask:</span> [Function] – Function to mutate input value on change (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onFocus:</span> [Function] – Focus callback. Returns DOM element, input value and setValue method to update input (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onChange:</span> [Function] – Change callback. Returns value of input (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onError:</span> [Function] – On Error callback. returns error state boolean (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onBlur:</span> [Function] – On Blue callback (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">validate:</span> [Function] – Validation callback to manage client side validation (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">readOnly:</span> [Boolean] – Set input to read only (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">required:</span> [Boolean] – Marks input to be required and ensures validation is run on blur (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">showIcon:</span> [Boolean] – Show or hide icon on right of input</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">spacing:</span> [String one of "loose", "tight" or "compact"] – Layout options (Default loose)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">type:</span> [String] – Native input type attribute</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">value:</span> [String, Intiger, Float] – Value of input</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">layout:</span> [String one of "full", "wide", "half", "narrow" or "quarter"] – Defines input layout width (Default Full)</li>
      </ul>

      <TextInput
        autoComplete={false}
        id='demo_input'
        value={ this.state.form.demo_input_01 }
        required={ true }
        errorMessage='This field cannot be left blank'
        label='A required field'
        onChange={ change('demo_input_01') } />
      <TextInput
        autoComplete={false}
        id='demo_input'
        value={ this.state.form.demo_input_02 }
        errors={ ['invalid email address', 'required'] }
        label='invalid email address'
        onChange={ change('demo_input_02') } />
      <TextInput
        autoComplete={false}
        id='demo_input'
        value={ this.state.form.demo_input_03 }
        label='Hint'
        hint='this is the hint'
        onChange={ change('demo_input_03') } />
      <TextInput
        id='demo_input_readonly'
        label='Read only'
        value="This is a readonly text input"
        readOnly={ true } />
      <TextInput
        id='demo_input_disabled'
        value="This is a disabled text input"
        disabled={ true } />
      <TextInput
        id='demo_input_icon'
        value={ this.state.form.demo_input_04 }
        label="custom icon"
        icon="rocket"
        onChange={ change('demo_input_04') } />
      <TextInput
        id='demo_input_icon'
        value={ this.state.form.demo_input_06 }
        label="custom icon left postion"
        icon="search"
        iconPosition='left'
        onChange={ change('demo_input_06') } />

      <TextCountDownInput
        id='demo_input_icon'
        value={ this.state.form.demo_input_05 }
        label="Text input with countdown"
        max={ 20 }
        warnMax={ 10 }
        onChange={ change('demo_input_05') } />

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
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
