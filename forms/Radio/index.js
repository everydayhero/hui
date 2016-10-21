import React, { PropTypes } from 'react'
import functional from 'react-functional'
import css from '../../css'
import * as styles from './styles'

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  focused: PropTypes.bool
}

const render = (props) => {
  const { id, label, checked, onChange } = props
  const { focused, ...rest } = props
  return (
    <label htmlFor={id} className={
      css(styles.radio,
      checked && styles.checkedRadio,
      (checked && focused) && styles.checkedFocusedRadio)}>
      <input {...rest} type='radio' onChange={onChange.bind(null, label)} />
      { label }
    </label>
  )
}

export default functional({ propTypes, render })
