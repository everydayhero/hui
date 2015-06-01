"use strict";

var React             = require('react');
var DateSelect        = require('../../../forms/DateSelect');
var DateSelectWrapper = require('../../../forms/DateSelect/Wrapper');

var Highlight = require('react-highlight');
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
     <h3 className="DemoPage__h3">DateSelect</h3>
      <p className="DemoPage__p">Basic text input.</p>
      <h4 className="DemoPage__h4">DateSelect propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li"><span className="DemoPage__bold">autoComplete:</span> [Boolean] – Allow browser auto complete to fill input (Default true)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">autoFocus:</span> [Boolean] – Set focus on input on render (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">disabled:</span> [Boolean] – Disable input (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">showError:</span> [Boolean] – Force errors to be displayed (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">name:</span> [String] - Field name (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">serrors:</span> [Array] - List of error message returned from server (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">errorMessage:</span> [String] – Message defined by client side validation to display on validation error (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onFocus:</span> [Function] – Focus callback. Returns DOM element, input value and setValue method to update input (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onChange:</span> [Function] – Change callback. Returns value of input (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onError:</span> [Function] – On Error callback. returns error state boolean (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">onBlur:</span> [Function] – On Blue callback (Optional)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">readOnly:</span> [Boolean] – Set input to read only (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">required:</span> [Boolean] – Marks input to be required and ensures validation is run on blur (Default false)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">spacing:</span> [String one of "loose", "tight" or "compact"] – Layout options (Default loose)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">type:</span> [String] – Native input type attribute</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">value:</span> [String, Intiger, Float] – Value of input</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">layout:</span> [String one of "full", "wide", "half", "narrow" or "quarter"] – Defines input layout width (Default Full)</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">months:</span> – i18n for month options</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">yearLabel:</span> label for year input</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">monthLabel:</span> label for month input</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">dateLabel:</span> label for date input</li>
        <li className="DemoPage__li"><span className="DemoPage__bold">promptValue:</span> Date to show in select promp e.g(1989-12-12)</li>
      </ul>
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
          required={ true }
          name="foo" />
      </FormRow>

      <h4>React Example</h4>
      <Highlight className='html'>
        { '<DateSelect\n' }
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
