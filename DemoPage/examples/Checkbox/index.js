'use strict'

import React from 'react'
import CheckboxInput from '../../../forms/Checkbox'
import formMixin from '../../../mixins/reactForm.mixin'

export default React.createClass({
  displayName: 'CheckboxExample',
  mixins: [formMixin],

  t: function (name) {
    var translation = {
      'join_label': 'Join or not',
      'terms_label': 'Terms & Conditions',
      'opt_in_label': 'Opt in'
    }

    return (translation[name])
  },

  render: function () {
    var change = this.inputChangeEventFn

    return (
      <div>
        <h3 className='DemoPage__h3' id='Checkbox'>Checkbox</h3>
        <p className='DemoPage__p'>Basic checkbox with label</p>

        {this.checkboxInput('opt_in')}

        <CheckboxInput
          id='terms'
          value={this.state.form.terms}
          label={'Accepts terms and conditions'}
          onChange={change('terms')} />

        <CheckboxInput
          id='help'
          value={this.state.form.help}
          label={'With a tooltip hint'}
          hint='This text gives the user more context about what this option entails.'
          onChange={change('help')} />

        <CheckboxInput
          id='errors'
          value={this.state.form.errors}
          label={'Accepts terms and conditions'}
          onChange={change('errors')}
          errors={['Please accept our terms and conditions.']} />

        <CheckboxInput
          id='special'
          value={this.state.form.special}
          label={<span>Label with <b>HTML</b> content </span>}
          onChange={change('special')} />

        <CheckboxInput
          id='no_click'
          value={this.state.form.no_click}
          label={<span>A <b>non-clickable</b> label with <b>HTML</b> content </span>}
          onChange={change('no_click')}
          labelIsClickable={false} />
      </div>
    )
  }
})
