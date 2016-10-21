import { c, cA, r } from '../../css/traits'

export const group = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: c.darkGrey,
  fontSize: r(0.65),
  fontWeight: '400',
  lineHeight: r(0.85),
  border: `2px solid ${c.lightGrey}`,
  maxHeight: r(2),
  borderRadius: r(1),
  backgroundColor: c.lightGrey,
  overflow: 'hidden'
}

export const focusedGroup = {
  boxShadow: `inset 0 3px ${r(0.75)} ${cA('darkGrey', 0.05)}`,
  borderColor: cA('darkGrey', 0.05)
}
