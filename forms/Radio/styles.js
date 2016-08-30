import { c, cA, r, rs } from '../../css/traits'

export const radio = {
  borderRadius: 0,
  display: 'inline-flex',
  padding: rs(0.25, 0.2),
  transition: 'all 150ms ease-out',
  position: 'relative',
  cursor: 'pointer',
  color: c.grey,
  ' input': {
    position: 'absolute !important', // Firefox BS
    clip: 'rect(0,0,0,0)',
    clip: 'rect(0 0 0 0)',
  },
  ':first-of-type': {
    paddingLeft: r(0.5),
    marginLeft: 0,
  },
  ':last-of-type': {
    paddingRight: r(0.5),
    marginRight: 0,
  }
}

export const checkedRadio = {
  backgroundColor: 'white',
  borderRadius: r(1),
  boxShadow: `0 0 ${r(0.4)} ${cA('darkGrey', 0.1)}`,
  padding: rs(0.25, 0.5),
  margin: rs(0, 0.2),
}

export const checkedFocusedRadio = {
  color: c.green,
  boxShadow: `0 0 ${r(0.3)} ${cA('darkGrey', 0.3)}`,
}
