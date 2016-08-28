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

/**
 * Custom validator generator. Call this function with a simple true/false validation function and an
 * error message describing failed validation, and get back a validator function with the same behaviour
 * as the built-in validator functions
 * @param {function(string)} validator function that should validate the passed input and return true or false
 * @param {string} message The error message that you want to display if validation fails
 * @returns {function(string, [function])} Generated validator function: call with a value and an optional
 * on-validate callback, as per the built-in validation functions
 */
function customValidator (validator, message) {
  return (val, fn) => {
    const valid = validator(val)
    if (fn) { fn(valid, message) }
    return { valid, message }
  }
}

/**
 * Composes any combination of validators, generating a single validator function that will run the composed
 * functions over a given input.
 *
 * @param {...function} validatorFunctions One or more validator functions, which can be any combination of:
 *  - a string that corresponds to one of the built in validators, such as 'name', 'email', etc
 *  - One of the built-in validator functions
 *  - A custom validator function: the return value of validation.custom when called with a
 *    custom validation function and an error message to display if validation fails.
 * @returns {function(string, [function])} a validator function that will operate exactly like a built-in
 * validator function, but will apply all the composed validators and return an object with
 * { valid: bool, messages: [string]}
 */
function composeValidators (...validatorFunctions) {
  return (val, fn) => {
    const results = validatorFunctions.map(validator => {
      if (typeof validator === 'string') {
        const valid = validators[validator](val)
        const message = validators[validator + 'Message']
        return { valid, message }
      } else {
        const validation = validator(val)
        if (typeof validation === 'boolean') {
          return { valid: validation }
        }
        return validation
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
