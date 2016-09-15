import React, { PropTypes } from 'react'
import functional from 'react-functional'
import cx from 'classnames'
import Icon from '../../atoms/Icon'
import css from '../../css'
import * as styles from './styles'

const propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

const render = ({
  className,
  style,
  color = 'default',
  icon,
  label,
  active,
  onClick
}) => {
  const classes = cx([
    css(
      styles.button,
      styles[`${active ? color : 'in'}Active`]
    ),
    className
  ])
  return (
    <button className={ classes } style={ style } tabIndex="0" onMouseDown={ onClick }>
      <Icon icon={ icon }/>
      { label && <div className={ css(styles.label) }>{ label }</div> }
    </button>
  )
}

export default functional({ propTypes, render })
