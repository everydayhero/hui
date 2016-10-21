'use strict'

import UrlInput from '../'

describe('UrlInput', function () {
  describe('defaults', function () {
    it('protocol is "http" by default', function () {
      var element, protocol
      element = renderIntoDocument(<UrlInput />)
      protocol = findByTag(element, 'select')

      protocol.value.should.equal('http://')
    })

    it('strips the protocol from supplied paths and sets the protocol to match', function () {
      var element, protocol, path
      element = renderIntoDocument(<UrlInput value='https://example.com' />)
      protocol = findByTag(element, 'select')
      path = findByTag(element, 'input')

      path.value.should.equal('example.com')
      protocol.value.should.equal('https://')
    })
  })

  describe('onChange', function () {
    var changeFn, element, protocol, path, parsedValue
    beforeEach(function () {
      parsedValue = null
      changeFn = function (value) { parsedValue = value }
      element = renderIntoDocument(<UrlInput value='http://example.org' onChange={changeFn} />)
      path = findByTag(element, 'input')
      protocol = findByTag(element, 'select')
    })

    it('calls the onChange function whenever the path changes', function () {
      Simulate.change(path, { target: { value: 'https://example.com' } })

      path.value.should.equal('example.com')
      parsedValue.should.equal('https://example.com')
    })

    it('calls the onChange function whenever the protocol changes', function () {
      Simulate.change(protocol, { target: { value: 'https://' } })

      path.value.should.equal('example.org')
      protocol.value.should.equal('https://')
      parsedValue.should.equal('https://example.org')
    })

    it('does not change the form to include only the protocol when the path is remved', function () {
      Simulate.change(path, { target: { value: '' } })

      parsedValue.should.equal('')
    })
  })

  describe('validation behavior', function () {
    var element, errorClasses

    it('does not have hui-TextInput--error class when errors is empty', function () {
      element = renderIntoDocument(<UrlInput errors={[]} />)
      errorClasses = scryByClass(element, 'hui-TextInput--error')

      errorClasses.length.should.equal(0)
    })

    it('does have hui-TextInput--error class when errors is present', function () {
      element = renderIntoDocument(<UrlInput errors={['foobar']} />)
      errorClasses = scryByClass(element, 'hui-TextInput--error')

      errorClasses.length.should.equal(1)
    })
  })
})
