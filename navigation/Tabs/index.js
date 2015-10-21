'use strict'

import React from 'react'
import classnames from 'classnames'

module.exports = React.createClass({
  displayName: 'Tabs',

  propTypes: {
    onChange: React.PropTypes.func,
    tabs: React.PropTypes.array,
    active: React.PropTypes.number
  },

  onChange: function(index) {
    let onChange = this.props.onChange

    return function(e) {
      e.preventDefault()
      onChange && onChange(index)
    }
  },

  renderTabLabels: function() {
    let props = this.props
    let tabLabels = []
    let component = this

    props.tabs.forEach(function(tab, index) {
      let classes = classnames([
        props.className,
        'hui-Tabs__tab',
        index === props.active && 'hui-Tabs__tab--active'
      ]);

      tabLabels.push(
        <a href="#" key={ index } className={ classes } onClick={ component.onChange(index) }>
          { tab.label }
        </a>
      )
    })

    return tabLabels
  },

  render: function() {
    let props = this.props

    return (
      <div className="hui-Tabs">
        <div>
          { this.renderTabLabels() }
        </div>
        <div className="hui-Tabs_content">
          { props.tabs[props.active].content }
        </div>
      </div>
    )
  }
})
