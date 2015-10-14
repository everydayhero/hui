'use strict'

import React from 'react'
import classnames from 'classnames'
import Icon from '../../atoms/Icon'

module.exports = React.createClass({
  displayName: 'Pagination',

  propTypes: {
    currentPage: React.PropTypes.number,
    count: React.PropTypes.number,
    inverse: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },

  onChange: function(increment) {
    let onChange = this.props.onChange
    return function(e) {
      e.preventDefault()

      onChange && onChange(increment)
    }
  },

  render: function() {
    let props = this.props
    let firstPage = props.currentPage === 0;
    let lastPage = props.currentPage === props.count - 1;
    let pageUpClasses = classnames([
      'hui-Pagination__pager',
      props.inverse && 'hui-Pagination__pager--inverse',
      lastPage && 'hui-Pagination__pager--disabled'
    ]);
    let pageDownClasses = classnames([
      'hui-Pagination__pager',
      props.inverse && 'hui-Pagination__pager--inverse',
      firstPage && 'hui-Pagination__pager--disabled'
    ]);

    return (
      <div className="hui-Pagination">
        <button className={ pageDownClasses } onClick={ this.onChange(-1) } disabled={ firstPage } kind="tertiary">
          <Icon icon="chevron-left"/>
        </button>
        <button className={ pageUpClasses } onClick={ this.onChange(1) } disabled={ lastPage } kind="tertiary">
          <Icon icon="chevron-right"/>
        </button>
      </div>
    )
  }
})
