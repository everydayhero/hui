/*jshint -W100 */

'use strict'

function _validate(exp, val, fn) {
  var valid = exp.test(val)
  if (fn) { fn(valid) }
  return valid
}

function isPhone(val, fn) {
  var exp = /^[+]{0,1}([0-9 \-()extensionEXTENSION#]){6,30}$/
  return _validate(exp, val, fn)
}

function isEmail(val, fn) {
  var exp = /^(([A-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])))?$/
  return _validate(exp, val, fn)
}

function isRequired(val, fn) {
  var valid = !!val.trim()
  if (fn) { fn(valid) }
  return valid
}

function isCVV3(val, fn) {
  var exp = /^\d{3}$/
  return _validate(exp, val, fn)
}

function isCVV4(val, fn) {
  var exp = /^\d{4}$/
  return _validate(exp, val, fn)
}

function isFuture(date) {
  var now = new Date()
  now.setDate(1)
  return date >= now
}

function isCreditCardExpiry(val, fn) {
  var exp = /^(0[1-9]|1[0-2]).*(\d{2})$/
  var d = new Date()
  var match = val.match(exp)
  var mmyy = match ? match.slice(1) : false
  d.setMonth(mmyy[0] - 1)
  d.setYear('20' + mmyy[1])
  var valid = exp.test(val) && isFuture(d)
  if (fn) { fn(valid) }
  return valid
}

function customValidator (validator, message, val, fn) {
  const valid = validator(val)
  if (fn) { fn(valid, message) }
  return { valid, message }
}

function composeValidators (...validatorFunctions) {
  return (val, fn) => {
    const results = validatorFunctions.map(validator => {
      if (typeof validator === 'string') {
        const valid = validators[validator](val)
        const message = validators[validator + 'Message']
        return { valid, message }
      } else {
        return validator(val)
      }
    }).filter(result => !result.valid)
    const valid = results.reduce((prev, curr) => curr.valid && prev, true)
    const messages = results.map(result => result.message)

    if (typeof fn === 'function') { fn(valid, messages) }

    return { valid, messages }
  }
}

const validators = {
  requiredMessage: 'This field cannot be left blank',
  required(val, fn) {
    return isRequired(val, fn)
  },

  emailMessage: 'Please enter a real email address',
  email(val, fn) {
    return isRequired(val) && isEmail(val, fn)
  },

  nameMessage: 'Please enter your real name',
  name(val, fn) {
    return isRequired(val, fn)
  },

  cvv3Message: 'Your CVV is 3 digits located on the back of your card',
  cvv3(val, fn) {
    return isRequired(val) && isCVV3(val, fn)
  },

  cvv4Message: 'Your CVV is 4 digits located on the front of your card',
  cvv4(val, fn) {
    return isRequired(val) && isCVV4(val, fn)
  },

  expiryMessage: 'Please enter a valid future expiry date',
  expiry(val, fn) {
    return isRequired(val) && isCreditCardExpiry(val, fn)
  },

  phoneMessage: 'Please enter your best contact number',
  phone(val, fn) {
    return isRequired(val) && isPhone(val, fn)
  },

  custom: customValidator,

  compose: composeValidators
}

export default validators
