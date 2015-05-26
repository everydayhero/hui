"use strict";

var React     = require('react');
var FormRow   = require('../../../forms/FormRow');
var Highlight = require('react-highlight');
var formMixin = require('../../../mixins/reactForm.mixin');
var TextInput = require('../../../forms/TextInput');

module.exports = React.createClass({
  displayName: 'FormRowExample',
  mixins: [formMixin],

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3>FormRowExample</h3>
      <p>Form Row.</p>
      <h4>Form Row.</h4>
      <ul>
        <li>id:</li>
        <li>value:</li>
        <li>layout:</li>
      </ul>
      <FormRow htmlFor="example" tip="I'm very helpful.">
        <TextInput
          id='example'
          layout='half'
          value={ this.state.form.demo_input_01 }
          label='An input'
          onChange={ change('demo_input_01') } />
      </FormRow>

      <h4>React Example</h4>
      <Highlight className='html'>
        { '<DateInput\n' }
        { '  id="end_on"\n' }
        { '  className="campaign__endOn"\n' }
        { '  value={ this.state.form.end_on }\n' }
        { '  placeholder={ "(dd/mm/yyyy)" }\n' }
        { '  onChange={ change("end_on") }\n' }
        { '  errors={ errors.start_on } />' }
      </Highlight>
    </div>
    );
  }
});
