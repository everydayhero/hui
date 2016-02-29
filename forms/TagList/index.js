'use strict'

import React from 'react'

import ListItem from './Item'

import remove from 'lodash/array/remove'
import isEmpty from 'lodash/lang/isEmpty'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'TagList',

  propTypes: {
    onItemIconClicked: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })).isRequired,
    spacing: React.PropTypes.string,
    layout: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      layout: 'full',
      spacing: 'loose'
    }
  },

  onClickItemIcon(data) {
    let props = this.props
    let onItemIconClicked = props.onItemIconClicked
    let elements = props.items

    remove(elements, (elem) => elem.id === data.id)

    return onItemIconClicked && onItemIconClicked(elements)
  },

  renderItems() {
    let items = this.props.items || []
    let onIconClick = this.onClickItemIcon

    return !isEmpty(items) && items.map((item) => <ListItem key={ item.id } item={ item } onIconClick={ onIconClick } />)
  },

  render() {
    let props = this.props
    let classes = classnames([
      'hui-TagList--' + props.layout,
      'hui-TagList--' + props.spacing,
      'hui-TagList'
    ])

    return (
      <div className={ classes }>
        <div className="TagList__list">
          { this.renderItems() }
        </div>
      </div>
    )
  }
})
