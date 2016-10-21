'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'Separator',

  propTypes: {
    color: React.PropTypes.oneOf(['white', 'grey', 'green']),
    separatorImagePath: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      color: 'green',
      separatorImagePath: 'url(images/separator_green.png)'
    }
  },

  render: function () {
    var formStyle
    if (this.props.separatorImagePath) {
      formStyle = { backgroundImage: 'url(' + this.props.separatorImagePath + ')' }
    }

    return (
      <hr style={formStyle} className={'Separator ' + this.props.color} />
    )
  }
})
