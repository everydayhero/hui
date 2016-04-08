'use strict'

import SearchInput from '../index'

describe('SearchInput', function() {
  describe('default', function() {
    let onChange = sinon.spy()
    let onSubmit = sinon.spy()
    let value = 'Foo'
    let search;

    beforeEach(function() {
      onChange.reset()
      onSubmit.reset()
      search = renderIntoDocument(<SearchInput value={ value } onChange={ onChange } onSubmit={ onSubmit }/>)
    })

    it('should return the value on submit', function() {
      let submit = findByClass(search, 'hui-SearchInput__submit')
      Simulate.click(submit)

      onSubmit.should.have.been.calledWith(value)
    })

    it('should return the value on input change', function() {
      let input = findByClass(search, 'hui-TextInput__label')
      Simulate.change(input)

      onChange.should.have.been.calledWith(value)
    })
  })
})
