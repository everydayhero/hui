"use strict";

var React       = require('react');
var SelectInput = require('../../../forms/SelectInput');
var formMixin   = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'SelectInputExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      toys_label: 'Toys Select:',
      toys_hint: 'These are some toys',
      toy_tip: 'What toy do you want?'
    };

    return (translation[name]);
  },

  render: function() {
    var change  = this.inputChangeEventFn;
    var options = [
      { value: 'transformer', label: 'Transformer' },
      { value: 'lego', label: 'Lego' },
      { value: 'ps4', label: 'PS4' }
    ];

    return (
    <div>
      <h3 className="DemoPage__h3" id="SelectInput">SelectInput</h3>

      { this.selectInput("toys", { options: options }) }

      <SelectInput
        id="toys"
        onChange={ change('toys01') }
        label="Select a toy"
        value={ this.state.form.toys01 }
        className="Toys__select"
        options={ options } />

      <SelectInput
        id="toys"
        onChange={ change('toys02') }
        value={ this.state.form.toys02 }
        label="disabled"
        disabled={ true }
        className="Toys__select"
        options={ options } />

      <SelectInput
        id="toys"
        onChange={ change('toys03') }
        value={ this.state.form.toys03 }
        label="Required and include blank with prompt"
        includeBlank={ true }
        className="Toys__select"
        errorMessage={ "You need to select a toy" }
        required={ true }
        prompt="Please select your toy"
        options={ options } />
    </div>
    );
  }
});
