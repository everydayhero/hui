import React, { PropTypes } from 'react'
import functional from 'react-functional'
import Radio from '../Radio'
import css from '../../css'
import * as styles from './styles'

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  labels: PropTypes.arrayOf(React.PropTypes.node).isRequired,
  hasFocus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

const render = ({
  name = 'RadioGroup',
  value,
  labels,
  hasFocus,
  autoFocus,
  onChange,
  onFocus,
  onBlur
}) => {
  const options = labels.map((label, i) => {
    const checked = value ? value === label : i === 0
    return <Radio key={name + i} name={name} id={name + i} label={label} checked={checked} focused={hasFocus} onChange={onChange} autoFocus={autoFocus && checked} />
  })
  return <div className={css(styles.group, hasFocus && styles.focusedGroup)} onFocus={onFocus} onBlur={onBlur}>{ options }</div>
}

export default functional({ propTypes, render })
