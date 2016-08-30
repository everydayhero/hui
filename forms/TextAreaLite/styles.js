import { c, r } from '../../css/traits'
import merge from 'lodash/merge'

const textAreaBase = {
  display: 'block',
  width: '100%',
  margin: 0,
  padding: r(0.3),
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  letterSpacing: 'inherit',
  lineHeight: 'inherit',
  transitionProperty: 'min-height, color',
  transitionDuration: '300ms, 160ms',
  transitionTimingFunction: 'ease-out'
}

export const wrapper = {
  position: 'relative',
  width: '100%',
  fontWeight: 400,
  fontSize: r(0.65),
  fontStyle: 'normal',
  lineHeight: r(0.9),
  marginBottom: 5
}

export const textarea = merge({}, textAreaBase, {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  border: 'none',
  resize: 'none',
  overflow: 'hidden',
  color: c.darkGrey,
  borderBottom: '2px solid transparent',
  ':focus': {
    outline: 0
  }
})

export const mirror = merge({}, textAreaBase, {
  color: 'transparent',
  whiteSpace: 'pre-wrap'
})

export const mirrorPlaceholder = {
  color: c.grey,
  fontStyle: 'italic'
}

export const focusedMirrorPlaceholder = {
  color: c.lightGrey,
}
