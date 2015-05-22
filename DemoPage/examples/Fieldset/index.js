"use strict";

var React     = require('react');
var FormRow   = require('../../../forms/FormRow');
var Highlight = require('react-highlight');
var formMixin = require('../../../mixins/reactForm.mixin');
var TextInput = require('../../../forms/TextInput');
var Fieldset = require('../../../forms/Fieldset');

module.exports = React.createClass({
  displayName: 'FieldsetExample',
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
      <Fieldset legend="I'm a field set">
        <FormRow htmlFor="example" helpText="I'm very helpful.">
          <TextInput
            autoComplete={false}
            id='example'
            layout='half'
            spacing='fitted'
            value={ this.state.form.demo_input_01 }
            label='An input'
            onChange={ change('demo_input_01') } />
        </FormRow>
        <FormRow htmlFor="example2" helpText="I'm very helpful too.">
          <TextInput
            id='example2'
            layout='half'
            spacing='fitted'
            value={ this.state.form.demo_input_02 }
            label='An input too'
            onChange={ change('demo_input_02') } />
        </FormRow>
      </Fieldset>

      <Fieldset>
        <FormRow htmlFor="example3" helpText="I'm very helpful.">
          <TextInput
            autoComplete={false}
            id='example3'
            layout='half'
            spacing='fitted'
            value={ this.state.form.demo_input_03 }
            label='An input'
            onChange={ change('demo_input_03') } />
        </FormRow>
        <FormRow htmlFor="example4" helpText="I'm very helpful too.">
          <TextInput
            id='example4'
            layout='half'
            spacing='fitted'
            value={ this.state.form.demo_input_04 }
            label='An input too'
            onChange={ change('demo_input_04') } />
        </FormRow>
      </Fieldset>

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
