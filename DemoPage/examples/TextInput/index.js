'use strict'

import React from 'react'
import TextCountDownInput from '../../../forms/TextCountDownInput'
import TextInput from '../../../forms/TextInput'
import TextInputWithAttachedSelect from '../../../forms/TextInputWithAttachedSelect'
import formMixin from '../../../mixins/reactForm.mixin'
import DurationInput from '../../../forms/DurationInput'

export default React.createClass({
  displayName: 'TextInputExample',

  mixins: [formMixin],

  t: function (name) {
    var translation = {
      'user_name_label': 'User Name:',
      'user_name_hint': 'The name of the user',
      'user_name_tip': 'You should fill this input out.'
    }

    return (translation[name])
  },

  render: function () {
    var change = this.inputChangeEventFn

    return (
      <div>
        <h3 className='DemoPage__h3' id='TextInput'>TextInput</h3>
        <p className='DemoPage__p'>Basic text input.</p>

        { this.textInput('user_name') }

        <TextInput
          autoComplete={false}
          id='demo_input'
          value={this.state.form.demo_input_01}
          label='Hint'
          placeHolder='This is a placeholder'
          onChange={change('demo_input_01')} />
        <TextInput
          autoComplete={false}
          id='demo_input'
          value={this.state.form.demo_input_02}
          required
          errorMessage='This field cannot be left blank'
          label='A required field'
          onChange={change('demo_input_02')} />
        <TextInput
          autoComplete={false}
          id='demo_input'
          value={this.state.form.demo_input_03}
          errors={['invalid email address', 'required']}
          label='invalid email address'
          onChange={change('demo_input_03')} />
        <TextInput
          autoComplete={false}
          id='demo_input'
          value={this.state.form.demo_input_04}
          label='Hint'
          hint='this is the hint'
          onChange={change('demo_input_04')} />
        <TextInput
          id='demo_input_readonly'
          label='Read only'
          value='This is a readonly text input'
          readOnly />
        <TextInput
          id='demo_input_disabled'
          value='This is a disabled text input'
          disabled />
        <TextInput
          id='demo_input_icon'
          value={this.state.form.demo_input_05}
          label='custom icon'
          icon='rocket'
          onChange={change('demo_input_05')} />
        <TextInput
          id='demo_input_icon_left'
          name='demo_input_icon_left'
          value={this.state.form.demo_input_06}
          label='custom icon left postion'
          icon='search'
          iconPosition='left'
          onChange={change('demo_input_06')} />

        <TextCountDownInput
          id='demo_input_icon'
          value={this.state.form.demo_input_07}
          label='Text input with countdown'
          max={20}
          warnMax={10}
          onChange={change('demo_input_07')} />

        <TextInputWithAttachedSelect
          textInputProps={{
            id: 'demo_input_attached_dropdown',
            name: 'demo_input_attached_dropdown',
            value: this.state.form.demo_input_08,
            label: 'custom input with child input',
            childPosition: 'right',
            onChange: change('demo_input_08')
          }}
          selectProps={{
            labelKey: 'label',
            valueKey: 'value',
            layout: 'compact',
            spacing: 'compact',
            value: this.state.form.demo_input_09 || 'steps',
            onChange: change('demo_input_09'),
            options: [
              {label: 'Steps', value: 'steps'},
              {label: 'Miles', value: 'miles'},
              {label: 'Kms', value: 'kilometers'}
            ]
          }}
        />

        <DurationInput
          id='demo_input_duration'
          name='demo_input_duration'
          value={this.state.form.demo_input_10}
          label='Duration'
          onChange={change('demo_input_10')}
        />
      </div>
    )
  }
})
