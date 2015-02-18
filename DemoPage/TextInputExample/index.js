/** @jsx React.DOM */
"use strict";

var React      = require('react');
var TextInput  = require('../../forms/TextInput');
var Highlight  = require('react-highlight');
var formMixin  = require('../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'TextInputExample',
  mixins: [formMixin],

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3>TextInput</h3>
      <p>Basic text input.</p>
      <h4>TextInput propTypes</h4>
      <ul>
        <li>errors:</li>
        <li>placeholder:</li>
        <li>readOnly:</li>
        <li>type:</li>
        <li>className:</li>
        <li>autoComplete:</li>
        <li>value:</li>
        <li>onBlur:</li>
        <li>onChange:</li>
      </ul>
      <div className="DemoPage__example">
        <TextInput
          autoComplete="off"
          className="hui-TextInput"
          id='demo_input'
          placeholder="Input here..."
          value={ this.state.form.demo_input }
          onChange={ change('demo_input') } />
      </div>

      <h4>React Example</h4>
      <Highlight className='html'>
        { '<TextInput\n' }
        { '  autoComplete="off"\n' }
        { '  className="hui-TextInput"\n' }
        { '  id={ props.id }\n' }
        { '  placeholder="Input here..."\n' }
        { '  value={ props.domain + value } />\n' }
      </Highlight>
    </div>
    );
  }
});
