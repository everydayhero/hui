'use strict'

import React from 'react'
import FormRow from '../../../forms/FormRow'
import formMixin from '../../../mixins/reactForm.mixin'
import TextInput from '../../../forms/TextInput'

export default React.createClass({
  displayName: 'FormRowExample',
  mixins: [formMixin],

  render: function () {
    var change = this.inputChangeEventFn

    return (
      <div>
        <h3 className='DemoPage__h3' id='FormRow'>FormRow</h3>
        <FormRow htmlFor='example' tip="I'm very helpful.">
          <TextInput
            id='example'
            layout='half'
            value={this.state.form.demo_input_01}
            label='An input'
            onChange={change('demo_input_01')} />
        </FormRow>
      </div>
    )
  }
})
