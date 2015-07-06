'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'AggregateSearchResult',

  propTypes: {
    url: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },

  render() {
    var props = this.props

    return (
      <a href={ props.url || '#' }
        className="AggregateSearchResult"
        onClick={ props.onSelect }>
        { props.children }
      </a>
    )
  }
})
