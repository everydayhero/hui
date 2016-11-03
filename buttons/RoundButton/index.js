import React, { PropTypes } from 'react'
import functional from 'react-functional'
import IconButton from '../IconButton'
import css, { cssCompact } from '../../css'
import * as styles from './styles'

const propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  label: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small'])
}

const render = ({ className = '', size, ...rest }) => (
  <IconButton {...rest} className={cssCompact(css(styles.button, styles[size]), className)} />
)

export default functional({ propTypes, render })
