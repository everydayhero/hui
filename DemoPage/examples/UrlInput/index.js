'use strict'

import React from 'react'
import UrlInput from '../../../forms/UrlInput'
import formMixin from '../../../mixins/reactForm.mixin'

export default React.createClass({
  displayName: 'UrlInputExample',

  mixins: [formMixin],

  t: function (name) {
    var translation = {
      website_url_label: 'Website Url:',
      website_url_tip: 'paste your url here.',
      website_url_hint: 'you can even paste the http part!'
    }

    return (translation[name])
  },

  render: function () {
    var change = this.inputChangeEventFn
    var url = 'redirect_url'

    return (
      <div>
        <h3 className='DemoPage__h3' id='UrlInput'>UrlInput</h3>

        { this.urlInput('website_url') }

        <UrlInput
          id={url}
          onChange={change(url)}
          value={this.state.form[url]}
          placeholder={'www.example.com'}
          errors={this.props.errors && this.props.errors[url]} />
      </div>
    )
  }
})
