import find from 'lodash/find'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import filter from 'lodash/filter'
import compact from 'lodash/compact'
import flatten from 'lodash/flatten'
import range from 'lodash/range'
import result from 'lodash/result'

const cardTypes = [
  {
    key: 'australian_bankcard',
    name: 'Australian BankCard',
    iin: [
      [5610],
      [560221, 560225]
    ],
    length: [
      [16]
    ],
    validate: true
  },
  {
    key: 'american_express',
    name: 'American Express',
    iin: [
      [34],
      [37]
    ],
    length: [
      [15]
    ],
    validate: true
  },
  {
    key: 'china_unionpay',
    name: 'China UnionPay',
    iin: [
      [62],
      [88]
    ],
    length: [
      [16, 19]
    ],
    validate: false
  },
  {
    key: 'diners_club_enroute',
    name: 'Diners Club enRoute',
    iin: [
      [2014],
      [2149]
    ],
    length: [
      [15]
    ],
    validate: false
  },
  {
    key: 'diners_club',
    name: 'Diners Club',
    iin: [
      [300, 305],
      [309],
      [36],
      [38, 39]
    ],
    length: [
      [14],
      [16]
    ],
    validate: true
  },
  {
    key: 'discover',
    name: 'Discover Card',
    iin: [
      [6011],
      [622126, 622925],
      [644, 649],
      [65]
    ],
    length: [
      [16]
    ],
    validate: true
  },
  {
    key: 'interpayment',
    name: 'InterPayment',
    iin: [
      [636]
    ],
    length: [
      [16, 19]
    ],
    validate: true
  },
  {
    key: 'jcb',
    name: 'Japan Credit Bureau',
    iin: [
      [3528, 3589]
    ],
    length: [
      [16]
    ],
    validate: true
  },
  {
    key: 'laser',
    name: 'Laser',
    iin: [
      [6304],
      [6706],
      [6771],
      [6709]
    ],
    length: [
      [16, 19]
    ],
    validate: true
  },
  {
    key: 'maestro',
    name: 'Maestro',
    iin: [
      [5018],
      [5020],
      [5038],
      [5612],
      [5893],
      [6304],
      [6759],
      [6761],
      [6762],
      [6763],
      ['0604'],
      [6390]
    ],
    length: [
      [12, 19]
    ],
    validate: true
  },
  {
    key: 'dankort',
    name: 'Dankort',
    iin: [
      [5019]
    ],
    length: [
      [11],
      [16]
    ],
    validate: true
  },
  {
    key: 'mastercard',
    name: 'MasterCard',
    iin: [
      [50, 55]
    ],
    length: [
      [16]
    ],
    validate: true
  },
  {
    key: 'solo',
    name: 'Solo',
    iin: [
      [6334],
      [6767]
    ],
    length: [
      [16],
      [18, 19]
    ],
    validate: true
  },
  {
    key: 'switch',
    name: 'Switch',
    iin: [
      [4903],
      [4905],
      [4911],
      [4936],
      [564182],
      [633110],
      [6333],
      [6759]
    ],
    length: [
      [16],
      [18, 19]
    ],
    validate: true
  },
  {
    key: 'visa',
    name: 'Visa',
    iin: [
      [4]
    ],
    length: [
      [13],
      [16]
    ],
    validate: true
  },
  {
    key: 'visa_electron',
    name: 'Visa Electron',
    iin: [
      [4026],
      [417500],
      [4405],
      [4508],
      [4844],
      [4913],
      [4917]
    ],
    length: [
      [16]
    ],
    validate: true
  }
]

// Card matching
function getCardType (type) {
  return find(cardTypes, { key: type })
}

function getLikelyMatch (num) {
  const matches = compact(getPossibleMatches(num))
  let key = ''
  let val = 0
  forEach(matches, function (d) {
    if (d.priority > val) {
      key = d.key
      val = d.priority
    }
  })
  return key
}

function getPossibleMatches (num) {
  return map(cardTypes, function (d) {
    const match = flatten(isMatch(d.iin, num))
    if (match.length) { return { key: d.key, priority: match[0] } }
  })
}

function isMatch (arr, num) {
  return filter(arr, function (d) {
    if (d.length > 1) { return isInRange(d, num) }
    return num.indexOf(d) === 0
  })
}

function isInRange (arr, num) {
  return !!filter(range(arr[0], arr[1] + 1), function (d) {
    return num.indexOf(d) === 0
  }).length
}

// Card validation methods
function validate (num) {
  const type = getLikelyMatch(num)
  if (!type || !isValidLength(type, num)) { return false }
  return !getCardType(type).validate || luhnTest(num)
}

function isValidLength (type, num) {
  return !!isMatch(getCardType(type).length, num.length.toString()).length
}

function luhnTest (a, b, c, d, e) {
  for (d = +a[b = a.length - 1], e = 0; b--;) {
    c = +a[b], d += ++e % 2 ? 2 * c % 10 + (c > 4) : c // eslint-disable-line no-sequences
  }
  return !(d % 10)
}

function clean (num) {
  return num.replace(/[^0-9]+/g, '')
}

const errorMessage = 'Please enter a valid credit card number'

export default {
  errorMessage,
  guessCard: function (num) {
    return getLikelyMatch(clean(num))
  },
  cardName: function (key) {
    return getCardType(key).name
  },
  validateCard: function (num, fn) {
    const valid = validate(clean(num))
    if (fn) { fn(valid, errorMessage) }
    return valid
  },
  isValidCardType: function (type) {
    return !!result(find(cardTypes, { key: type }), 'name')
  },
  maskCardInput: function (num) {
    num = clean(num)
    return num ? num.match(/.{1,4}/g).join('  ') : ''
  },
  obscureCardInput: function (num) {
    return num.replace(/.(?=.{4})/g, 'x')
  },
  containsValidCard: function (text) {
    const candidatePattern = /[0-9]{11,19}/g
    const candidates = text.replace(/[ -]/g, '').match(candidatePattern) || []
    return !!find(candidates, (current) => {
      return validate(current)
    })
  }
}
