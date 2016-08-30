import { c, cA, r, fill } from '../../css/traits'
import merge from 'lodash/merge'

const colorStyles = (color) => (
  merge({}, fill(color), {
    ':hover': fill(color),
    ':focus': fill(color),
    ' > *': { color: 'white' }
  })
)

const active = {
  ':focus': {
    transform: 'scale(1.08)',
    boxShadow: 'none'
  }
}

export const button = {
  display: 'inline-block',
  position: 'relative',
  transition: 'all 250ms ease-out',
  textAlign: 'center',
  cursor: 'pointer',
  padding: '0',
  ':focus': {
    outline: '0',
    boxShadow: `inset 0 0 ${r(0.4)} ${cA('grey', 0.25)}`,
    backgroundColor: cA('grey', 0.05)
  }
}

export const label = {
  position: 'absolute',
  left: '0',
  right: '0',
  bottom: '0',
  fontSize: r(0.38),
  lineHeight: r(0.6),
  textTransform: 'uppercase',
  letterSpacing: r(0.025)
}

export const inActive = {
  ':hover': merge({}, fill(c.grey), {
    ':focus': fill(c.grey),
    ' > *': { color: 'white' }
  })
}

export const defaultActive = merge({}, colorStyles(c.green), active)

export const twitterActive = merge({}, colorStyles(c.twitter), active)

export const facebookActive = merge({}, colorStyles(c.facebook), active)
