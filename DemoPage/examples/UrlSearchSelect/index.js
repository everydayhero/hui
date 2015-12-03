'use strict'

import React from 'react'
import UrlSearchSelect from '../../../forms/UrlSearchSelect'

export default React.createClass({
  displayName: 'UrlSearchSelectExample',

  getInitialState () {
    return {
      pageUrl: ''
    }
  },

  deserializeWikipediaResponse (response) {
    return response.query.search.map((result) => {
      return {
        value: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
        label: result.title
      }
    })
  },

  handleSelection (page) {
    this.setState({
      pageUrl: page.value
    })
  },

  render: function() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="UrlSearchSelect">UrlSearchSelect</h3>

        <UrlSearchSelect
          label="Search for a Wikipedia article"
          url={ 'https://en.wikipedia.org/w/api.php' }
          params={ {
            action: 'query',
            list: 'search',
            continue: '',
            format: 'json'
          } }
          jsonp
          queryProperty="srsearch"
          onSelection={ this.handleSelection }
          deserializeResponse={ this.deserializeWikipediaResponse } />

        <p className="DemoPage__p">
          { this.state.pageUrl || 'No page selected' }
        </p>
      </div>
    )
  }
})
