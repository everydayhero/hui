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

    return (
    <div>
      <h3>DateInput</h3>
      <p>Date input.</p>
      <h4>DateInput propTypes (See TextInput for complete list of propTypes)</h4>
      <ul>
        <li>id:</li>
        <li>value:</li>
        <li>layout:</li>
      </ul>
      <DateInput
        className="campaign__endOn"
        value={ this.state.form.end_on }
        onChange={ change("end_on") } />
      <DateInput
        className="campaign__endOn"
        value={ this.state.form.end_on2 }
        onChange={ change("end_on2") } />

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
