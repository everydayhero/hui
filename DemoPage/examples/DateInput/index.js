"use strict";

var React     = require('react');
var DateInput = require('../../../forms/DateInput');
var Highlight = require('react-highlight');
var formMixin = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'DateInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      start_on_label: 'Start On:'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;
    var errors = this.props.errors || {};

    return (
    <div>
      <h3>DateInput</h3>
      <p>Date input.</p>
      <h4>DateInput propTypes</h4>
      <ul>
        <li>id:</li>
        <li>className:</li>
        <li>value:</li>
        <li>placeholder:</li>
        <li>onChange:</li>
      </ul>
      <div className="DemoPage__example">
        { this.dateInput('start_on', "(dd/mm/yyyy)", { helpText: 'This is the help text' }) }
        <DateInput
          id="end_on"
          className="campaign__endOn"
          value={ this.state.form.end_on }
          placeholder={ "(dd/mm/yyyy)" }
          onChange={ change("end_on") }
          errors={ errors.start_on } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { "{ this.dateInput('start_on', '(dd/mm/yyyy')) }\n" }
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
