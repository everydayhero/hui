'use strict'

import React from 'react'

const Tag = ({ children }) => (
  <div className="hui-Tag">
    <div className="hui-Tag__label">
      { children }
    </div>
  </div>
)

Tag.displayName = 'Tag'

export default Tag
