"use strict";

var React             = require('react');
var DateSelect        = require('../../../forms/DateSelect');
var DateSelectWrapper = require('../../../forms/DateSelect/Wrapper');

var formMixin = require('../../../mixins/reactForm.mixin');
var FormRow   = require('../../../forms/FormRow');

module.exports = React.createClass({
  displayName: 'DateSelectExample',
  mixins: [formMixin],

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
     <h3 className="DemoPage__h3" id="DateSelect">DateSelect</h3>

      { this.dateSelect("start_on") }

      <FormRow htmlFor="end_on" tip="I'm very helpful.">
        <DateSelect
          className="campaign__endOn"
          value={ this.state.form.end_on }
          onChange={ change("end_on") } />
        <DateSelect
          className="campaign__endOn"
          value={ this.state.form.end_on2 }
          onChange={ change("end_on2") }
          errors={ ['error'] } />
        <DateSelectWrapper
          value=""
          name="foo" />
      </FormRow>
    </div>
    );
  }
});
