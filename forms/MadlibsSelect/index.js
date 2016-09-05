import React, { PropTypes } from 'react'
import functional from 'react-functional'
import css from '../../css'
import * as styles from './styles'

const Option = ({ value, display }) => <option key={ value } value={ value }>{ display }</option>

const propTypes = {
  value: PropTypes.node,
  hasFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  displayOptions: PropTypes.arrayOf(PropTypes.string),
  displayValue: PropTypes.string
}

const render = ({
  options,
  displayOptions = [],
  displayValue,
  hasFocus,
  ...rest
}) => (
  <span className={ css(styles.wrapper, hasFocus && styles.focused) }>
    <pre className={ css(styles.mirror) }>{ displayValue || rest.value || options[0] }</pre>
    <select className={ css(styles.select) } { ...rest } size={ 1 }>
      { options.map((o, i) => Option({ value: o, display: displayOptions[i] || o })) }
    </select>
  </span>
)

export default functional({ propTypes, render })
