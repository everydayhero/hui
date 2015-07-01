'use strict';

var React     = require('react');
var FormRow   = require('../../../forms/FormRow');
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
        <h3 className="DemoPage__h3" id="Fieldset">FormRowExample</h3>
        <Fieldset legend="I'm a field set">
          <FormRow htmlFor="example" tip="I'm very helpful.">
            <TextInput
              autoComplete={false}
              id="example"
              layout="half"
              spacing="fitted"
              value={ this.state.form.demo_input_01 }
              label="An input"
              onChange={ change('demo_input_01') } />
          </FormRow>
          <FormRow htmlFor="example2" tip="I'm very helpful too.">
            <TextInput
              id="example2"
              layout="half"
              spacing="fitted"
              value={ this.state.form.demo_input_02 }
              label="An input too"
              onChange={ change('demo_input_02') } />
          </FormRow>
        </Fieldset>

        <Fieldset>
          <FormRow htmlFor="example3" tip="I'm very helpful.">
            <TextInput
              autoComplete={false}
              id="example3"
              layout="half"
              spacing="fitted"
              value={ this.state.form.demo_input_03 }
              label="An input"
              onChange={ change('demo_input_03') } />
          </FormRow>
          <FormRow htmlFor="example4" tip="I'm very helpful too.">
            <TextInput
              id="example4"
              layout="half"
              spacing="fitted"
              value={ this.state.form.demo_input_04 }
              label="An input too"
              onChange={ change('demo_input_04') } />
          </FormRow>
        </Fieldset>
      </div>
    );
  }
});
