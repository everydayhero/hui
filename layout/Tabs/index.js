'use strict'

import React from 'react'

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
    let tabs = this.props.tabs
    let tabLabels = []
    let component = this;

    tabs.forEach(function(tab, index) {
      tabLabels.push(
        <a href="#" onClick={ component.onChange(index) }>
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
        { this.renderTabLabels() }
        <div className="hui.Tabs_active">
          { props.tabs[props.active].content }
        </div>
      </div>
    )
  }
})
