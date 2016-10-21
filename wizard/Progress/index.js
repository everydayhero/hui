'use strict'

import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'Progress',

  getDefaultProps: function () {
    return {
      total: 1,
      active: 0
    }
  },

  onChange: function (index) {
    var onChange = this.props.onChange
    return function (e) {
      e.preventDefault()
      onChange && onChange(index)
    }
  },

  renderItems: function () {
    var items = []
    var total = this.props.total
    var index = 0
    var active = parseInt(this.props.active)

    if (total !== 0) {
      while (index < total) {
        var classes = classnames([
          'hui-Progress__item',
          (index === active) && 'hui-Progress__item--active',
          (active >= index) && 'hui-Progress__item--viewed'
        ])

        items.push(
          <a href='#' key={index} className={classes} onClick={this.onChange(index)} />
        )

        index++
      }
    }

    return items
  },

  render: function () {
    return (
      <div className='hui-Progress'>
        { this.renderItems() }
      </div>
    )
  }
})
