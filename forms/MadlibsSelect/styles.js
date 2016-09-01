import { c, r } from '../../css/traits'
import merge from 'lodash/merge'

const selectMirror = {
  background: 'transparent',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  letterSpacing: 'inherit',
  wordSpacing: 'inherit'
}

export const wrapper = {
  transition: 'all 150ms ease-out',
  cursor: 'pointer',
  position: 'relative',
  color: c.green,
  display: 'inline-block',
  ':before': {
    content: '""',
    transition: 'all 150ms ease-out',
    position: 'absolute',
    display: 'block',
    height: 1,
    width: '100%',
    backgroundColor: 'currentColor',
    top: '91%',
    left: 0,
  }
}

export const focused = {
  ':before': {
    height: 2
  }
}

export const mirror = merge({}, selectMirror, {
  display: 'inline-flex',
  color: 'inherit',
  whiteSpace: 'pre-wrap'
})

export const select = merge({}, selectMirror, {
  opacity: 0,
  appearance: 'none',
  textIndent: 0.01,
  textOverflow: '',
  border: 'none',
  color: 'transparent',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  ':focus': {
    outline: 0
  },
  ' option': {
    appearance: 'none',
    fontSize: r(0.75),
    textTransform: 'capitalize',
    color: c.darkGrey
  }
})

