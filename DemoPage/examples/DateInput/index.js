'use strict';

var React     = require('react');
var DateInput = require('../../../forms/DateInput');
var formMixin = require('../../../mixins/reactForm.mixin');
var FormRow   = require('../../../forms/FormRow');

module.exports = React.createClass({
  displayName: 'DateInputExample',
  mixins: [formMixin],

  initialiseForm: function(form) {
    form.start_on = "2015-07-11"
  },

  t: function(name) {
    var translation = {
      start_on_label: 'Start On:',
      start_on_tip: 'When should the thing start?'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3 className="DemoPage__h3">DateInput</h3>

      { this.dateInput('start_on') }

      <FormRow htmlFor="end_on" tip="I'm very helpful.">
        <DateInput
          className="campaign__endOn"
          value={ this.state.form.end_on }
          onChange={ change('end_on') } />
        <DateInput
          className="campaign__endOn"
          value={ this.state.form.end_on2 }
          onChange={ change('end_on2') } />
      </FormRow>
    </div>
    );
  }
});
