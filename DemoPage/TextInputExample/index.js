/** @jsx React.DOM */
"use strict";

var React     = require('react');
var TextInput = require('../../forms/TextInput');
var Highlight = require('react-highlight');
var formMixin = require('../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'TextInputExample',
  mixins: [formMixin],

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3 className="DemoPage__h3">TextInput</h3>
      <p className="DemoPage__p">Basic text input.</p>
      <h4 className="DemoPage__h4">TextInput propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">errors:</li>
        <li className="DemoPage__li">placeholder:</li>
        <li className="DemoPage__li">readOnly:</li>
        <li className="DemoPage__li">type:</li>
        <li className="DemoPage__li">className:</li>
        <li className="DemoPage__li">autoComplete:</li>
        <li className="DemoPage__li">value:</li>
        <li className="DemoPage__li">onBlur:</li>
        <li className="DemoPage__li">onChange:</li>
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

      <h4 className="DemoPage__h3">React Example</h4>
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
