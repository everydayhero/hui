'use strict'

import React from 'react'
import classnames from 'classnames'
import Icon from '../../../atoms/Icon'

const component = (props) => {
  var className = classnames({
    'active': props.active,
    'Navigation__dashboardLink': props.isDashboardLink
  }, 'Navigation__link')

  return (
    <a href="#" className={ className } onClick={ props.clickHandler }>
      <Icon icon={ props.icon } />
      <span className="Navigation__linkText">
        { props.children }
      </span>
    </a>
  )
}

component.propTypes = {
  icon: React.PropTypes.string,
  active: React.PropTypes.bool,
  isDashboardLink: React.PropTypes.bool,
  clickHandler: React.PropTypes.func
}

export default component
