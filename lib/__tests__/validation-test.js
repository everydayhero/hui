import { expect } from 'chai'
import sinon from 'sinon'
import _ from 'lodash'

import validation from '../validation'

describe('validation module', () => {
  describe('#custom', () => {
    it('should return the result of the validator function applied to the value', () => {
      const testValidator = val => val === 'bob'
      const testValue = 'bob'

      const { valid: result } = validation.custom(testValidator, 'message', testValue)
      expect(result).to.be.true

      const invalidValue = 'not bob'
      const { valid: invalidResult } = validation.custom(testValidator, 'test message', invalidValue)
      expect(invalidResult).to.be.false
    })

    it('should return the message parameter as well (which generally will be partially applied)', () => {
      const testValidator = val => val === 'bob'
      const { message } = validation.custom(testValidator, 'test message', 'bob')
      expect(message).to.equal('test message')
    })

    it('should call fn with the result of the validation if fn is passed', () => {
      const testFn = sinon.stub()
      validation.custom(() => true, 'test message', 'test value', testFn)
      expect(testFn.called).to.be.true
      expect(testFn.firstCall.args[0]).to.equal(true)
    })
  })

  describe('#compose', () => {
    let validatorA, validatorB

    beforeEach(() => {
      validatorA = _.partial(validation.custom, val => val === 'bob', 'Test message A')
      validatorB = _.partial(validation.custom, val => val !== 'bob', 'Test message B')
    })

    it('should return a function', () => {
      const composedValidator = validation.compose(validatorA, validatorB)
      expect(typeof composedValidator).to.equal('function')
    })

    it('should evaluate to a nested array of the custom validator results', () => {
      const composedValidator = validation.compose(validatorA, validatorB)
      expect(composedValidator('bob')).to.deep.equal({
        valid: false,
        messages: ['Test message B']
      })
    })

    it('should evaluate a string input to its preset validate function', () => {
      const composedValidator = validation.compose(validatorA, 'cvv3', 'phone')
      expect(composedValidator('bob')).to.deep.equal({
        valid: false,
        messages: [
          'Your CVV is 3 digits located on the back of your card',
          'Please enter your best contact number'
        ]
      })
    })
  })
})
