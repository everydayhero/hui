'use strict'

import React from 'react'

export default (component, options) => {
  options = options || {}
  let div = document.createElement('div')
  document.body.appendChild(div)

  options.onClose = () => {
    React.unmountComponentAtNode(div)
    document.body.removeChild(div)
  }

  React.render(React.createFactory(component)(options), div)
}
