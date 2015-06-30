"use strict";

var React     = require('react');
var TextArea  = require('../../../forms/TextArea');
var formMixin = require('../../../mixins/reactForm.mixin');

module.exports = React.createClass({
  displayName: 'TextAreaExample',
  mixins: [formMixin],

  t: function(name) {
    var translation = {
      food_menu_label: 'Food Menu:',
      story_label: 'Story',
      story_hint: 'This is a hint.',
      story_tip: 'This is a tip.'
    };

    return (translation[name]);
  },

  render: function() {
    var change = this.inputChangeEventFn;

    return (
    <div>
      <h3 className="DemoPage__h3" id="TextArea">TextArea</h3>
      <p className="DemoPage__p">Basic text area.</p>
        { this.textArea("story") }

        <TextArea
          className="Your-TextArea"
          id="description"
          label="With hint"
          value={ this.state.form.description }
          onChange={ change('description') }
          hint="Tell me a story."
          errors={ this.props.errors }/>

       <TextArea
          className="Your-TextArea"
          id="description"
          value={ this.state.form.description_02 }
          onChange={ change('description_02') }
          required={ true }
          label="Error message and required"
          errorMessage="You need to do this thing."
          errors={ ["You should attend a marketing writing course."] }/>
    </div>
    );
  }
});
