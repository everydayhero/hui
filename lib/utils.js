// Data utils
export const simpleClone = (o) => JSON.parse(JSON.stringify(o))
export const getKey = (o, v) => {
  for (let k in o) {
    if (o.hasOwnProperty(k) && o[k] === v) return k
  }
  return null
}

// Formatting utils
export const roundNicely = (num) => +(Math.round(num + 'e+2') + 'e-2')
export const stripNonNumbers = (str) => str.replace(/\D/g, '')
export const compactToString = (arr) => arr.filter(d => d).join(' ')
