'use strict'

import React from 'react'
import FileInput from '../FileInput'

export default React.createClass({
  displayName: 'hui-ImageInput',

  propTypes: {
    id: React.PropTypes.string,
    onChange: React.PropTypes.func,
    errors: React.PropTypes.array,
    value: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      value: {}
    }
  },

  renderImage: function (image) {
    if (image && image.url && image.filename) {
      return (
        <img className='hui-ImageInput__img' src={image.url} alt={image.filename} />
      )
    } else {
      return null
    }
  },

  render: function () {
    var props = this.props
    var image = props.value

    return (
      <div className='hui-ImageInput__div'>
        { this.renderImage(image) }
        <FileInput {...props} />
      </div>
    )
  }
})
