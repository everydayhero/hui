import React, { PropTypes } from 'react'
import functional from 'react-functional'
import css from '../../css'
import * as styles from './styles'

const propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  hasFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  minRows: PropTypes.number
}

const render = ({
  value = '',
  hasFocus,
  onChange,
  onFocus,
  onBlur,
  minRows = 1,
  placeholder = `What's on your mind?`
}) => {
  const mirrorClasses = css(
    styles.mirror,
    !value && styles.mirrorPlaceholder,
    (!value && hasFocus) && styles.focusedMirrorPlaceholder
  )
  return (
    <div className={ css(styles.wrapper) }>
      <pre className={ mirrorClasses } style={{ minHeight: minRows * 24 }}>{ value || placeholder }</pre>
      <textarea className={ css(styles.textarea) } value={ value } onChange={ onChange } onFocus={ onFocus } onBlur={ onBlur } />
    </div>
  )
}

export default functional({ propTypes, render })
