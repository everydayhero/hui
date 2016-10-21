const mapObject = (o, fn) => {
  const newO = {}
  Object.keys(o).forEach((key) => { newO[key] = fn(o[key]) })
  return newO
}

const baseColours = {
  white: '255,255,255',
  green: '0,160,68',
  darkGrey: '88,88,88',
  grey: '179,179,179',
  lightGrey: '238,238,238',
  lightestGrey: '249,249,249',
  facebook: '59,89,152',
  twitter: '85,172,238'
}

export const f = {
  interface: 'Lato, Helvetica Neue, Helvetica, sans-serif',
  display: 'Lato, Helvetica Neue, Helvetica, sans-serif',
  heading: 'Lato, Helvetica Neue, Helvetica, sans-serif',
  content: 'Merriwhether, Georgia, Times New Roman, serif'
}

export const c = mapObject(baseColours, (color) => `rgb(${color})`)
export const cA = (color, alpha) => `rgba(${baseColours[color]},${alpha})`
export const url = (url) => `url(${url})`
export const r = (n = 1, u = 'rem', lh = 1.5) => `${n * lh}${u}`
export const rs = (first, ...rest) => (
  typeof first === 'array'
    ? rest.reduce((a, d) => `${a} ${r(...d)}`, r(...first))
    : rest.reduce((a, d) => `${a} ${r(d)}`, r(first))
)

export const fill = (color) => (
  {
    backgroundColor: color,
    borderColor: color
  }
)

// longform aliases
export const font = f
export const colors = c
export const colorsAlpha = cA
export const rhythm = r
export const rhythms = rs
