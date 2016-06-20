'use strict';

import React from 'react/addons'
import Icon from '../../../atoms/Icon'
import Tag from '../../../atoms/Tag'

export default React.createClass({
  displayName: 'TagListItem',

  propTypes: {
    item: React.PropTypes.object,
    icon: React.PropTypes.string,
    onIconClick: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      item: {},
      icon: 'remove',
      onIconClick: null
    }
  },

  onClick(e) {
    const { onIconClick, item } = this.props
    e.preventDefault()
    return onIconClick && onIconClick(item)
  },

  renderIcon() {
    const { icon, item } = this.props

    return icon && (
      <button id={ item.id } className="hui-TagListItem__iconButton" onClick={ this.onClick }>
        <Icon icon={ icon } fixedWidth={ true } />
      </button>
    )
  },

  render() {
    return (
      <Tag>
        { this.props.item.name }
        { this.renderIcon() }
      </Tag>
    )
  }
})
