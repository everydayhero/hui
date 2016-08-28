import { expect } from 'chai'
import sinon from 'sinon'

import validation from '../validation'

describe('validation module', () => {
  describe('#custom', () => {
    it('should return a validator function', () => {
      const testValidator = () => true
      const testMessage = 'test message'

      expect(typeof validation.custom(testValidator, testMessage)).to.equal('function')
    })

    it('should return the result of the validator function applied to the value', () => {
      const testValidator = val => val === 'bob'
      const testValue = 'bob'

      const customValidator = validation.custom(testValidator, 'test error message')

      const { valid: result } = customValidator(testValue)
      expect(result).to.be.true

      const invalidValue = 'not bob'
      const { valid: invalidResult } = customValidator(invalidValue)
      expect(invalidResult).to.be.false
    })

    it('should return the partially applied message parameter', () => {
      const testValidator = val => val === 'bob'
      const testMessage = 'test message'

      const customValidator = validation.custom(testValidator, testMessage)

      const { message } = customValidator('bob')
      expect(message).to.equal(testMessage)
    })

    it('should call fn with the result of the validation and error message if fn is passed', () => {
      const testFn = sinon.stub()
      const testMessage = 'test message'
      const customValidator = validation.custom(() => true, testMessage)

      customValidator('test value', testFn)

      expect(testFn.called).to.be.true
      expect(testFn.firstCall.args[0]).to.equal(true)
      expect(testFn.firstCall.args[1]).to.equal(testMessage)
    })
  })

  describe('#compose', () => {
    let validatorA, validatorB

    beforeEach(() => {
      validatorA = validation.custom(val => val === 'bob', 'Test message A')
      validatorB = validation.custom(val => val !== 'bob', 'Test message B')
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
