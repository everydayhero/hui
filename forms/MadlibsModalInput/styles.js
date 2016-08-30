import { c, r } from '../../css/traits'
import merge from 'lodash/merge'

const MadlibsModalInputBase = {
  appearance: 'none',
  color: c.darkGrey,
  border: 'none',
  padding: 0,
  margin: 0,
  background: 'none',
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'middle',
  ':focus': {
    outline: 0,
    color: c.green
  }
}

const modalSelect = {
  fontSize: r(1.5),
  color: c.grey,
}

const MadlibsModalInput = {
  fontSize: r(1.4),
  borderBottom: `2px solid ${c.lightGrey}`,
  position: 'relative',
  top: '-2px'
}

export const wrapper = {
  color: c.green,
  display: 'inline-flex'
}

export const label = {
  transition: 'all 150ms ease-out',
  cursor: 'pointer',
  position: 'relative',
  wordSpacing: 'normal',
  ':focus': {
    outline: 0
  },
  ':before': {
    content: '""',
    transition: 'all 150ms ease-out',
    position: 'absolute',
    display: 'block',
    height: '1px',
    width: '100%',
    backgroundColor: 'currentColor',
    top: '91%',
    left: 0
  },
  ':focus:before': {
    height: '2px'
  }
}

export const modal = {
  transition: 'all 250ms ease-out',
  position: 'absolute',
  zIndex: 1,
  height: '100%',
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: c.lightestGrey,
  padding: r(0.25),
  ' > *': {
    margin: '0 1%'
  },
  ' input': merge({}, MadlibsModalInputBase, MadlibsModalInput),
  ' select': merge({}, MadlibsModalInputBase, modalSelect),
  ' option': {
    fontSize: r(0.75)
  },
  ' input[type=number]': {
    maxWidth: r(3)
  },
  ' input[type=tel]': {
    maxWidth: r(3)
  }
}

