'use strict'

import Promise from 'bluebird'

const proxyquire = require('proxyquire')
  .noCallThru()
  .noPreserveCache()

let mockResult = {
  resources: [
    { label: 'Label', value: 'Value' }
  ]
}

let mockGetJSON = sinon.spy(function () {
  return new Promise((resolve) => {
    return resolve(mockResult)
  })
})

let mockDebounce = function (func) {
  return func
}

const UrlSearchSelect = proxyquire('../', {
  '../../lib/getJSON': mockGetJSON,
  'lodash/function/debounce': mockDebounce
}).default

describe('UrlSearchSelect', () => {
  describe('initialisation', () => {
    it('renders a TextInput for entering a search query', () => {
      let subject = renderIntoDocument(
        <UrlSearchSelect url="http://everydayhero.com" />
      ).refs.searchInput

      expect(subject).to.be.ok
    })
  })

  describe('#fetchResults', () => {
    it('calls getJSON with supplied url', () => {
      renderIntoDocument(
        <UrlSearchSelect url="http://everydayhero.com" />
      ).fetchResults()

      expect(mockGetJSON).calledWith('http://everydayhero.com')
    })

    it('calls getJSON with a params object containing props.params and q: state.queryValue', () => {
      let element = renderIntoDocument(
        <UrlSearchSelect
          params={{ some: 'Param' }}
          url="http://everydayhero.com" />
      )
      element.fetchResults('foobar')

      expect(mockGetJSON).calledWithMatch('http://everydayhero.com', {
        q: 'foobar',
        some: 'Param'
      })
    })

    it('calls a supplied deserializeResponse function', (done) => {
      let subject = sinon.spy(function (response) {
        return response.resources
      })

      renderIntoDocument(
        <UrlSearchSelect
          url="http://everydayhero.com"
          deserializeResponse={ subject } />
      ).fetchResults().done(() => {
        expect(subject).to.be.called
        done()
      })
    })

    it('sets state.results to the return value of props.deserializeResponse(reponse)', (done) => {
      let element = renderIntoDocument(
        <UrlSearchSelect url="http://everydayhero.com" />
      )
      element.fetchResults().done(() => {
        expect(element.state.results).to.eql(mockResult.resources)
        done()
      })
    })
  })

  describe('#cancelRequest', () => {
    it('cancels the previous pending request', () => {
      let element = renderIntoDocument(
        <UrlSearchSelect url="http://everydayhero.com" />
      )
      element.cancelRequest()
      expect(element.state.pendingRequest).to.be.false
    })
  })

  describe('#handleSearchInputChange', () => {
    context('when the supplied query string is long enough', () => {
      it('sets state.queryValue and enqueues a result fecth', () => {
        let element = renderIntoDocument(
          <UrlSearchSelect url="http://everydayhero.com" />
        )
        element.handleSearchInputChange('foobar')
        expect(element.state.queryValue).to.eq('foobar')
      })
    })
  })

  describe('requireValue()', () => {
    context('when props.required is true and there is no selectedOption', () => {
      it('sets state.hasError and calls props.onError', () => {
        let onError = sinon.spy()
        let element = renderIntoDocument(
          <UrlSearchSelect
            required
            onError={ onError }
            url="http://everydayhero.com" />
        )
        element.requireValue()
        expect(element.state.hasError).to.eq(true)
        expect(onError).calledWith(true)
      })

      it('ensures state.isOpen is true (to display error)', () => {
        let element = renderIntoDocument(
          <UrlSearchSelect
            required
            url="http://everydayhero.com" />
        )
        element.setState({isOpen: false})
        element.requireValue()
        expect(element.state.isOpen).to.eq(true)
      })
    })

    context('otherwise', () => {
      it('does not mutate state.isOpen', () => {
        let element = renderIntoDocument(
          <UrlSearchSelect
            url="http://everydayhero.com" />
        )

        element.setState({isOpen: false})
        element.requireValue()
        expect(element.state.isOpen).to.eq(false)

        element.setState({isOpen: true})
        element.requireValue()
        expect(element.state.isOpen).to.eq(true)
      })
    })
  })

  describe('setFocus()', () => {
    it('calls requireValue() whenever there is a blur event within the component', (done) => {
      let element = renderIntoDocument(
        <UrlSearchSelect
          required
          url="http://everydayhero.com" />
      )
      Simulate.blur(element.refs.searchInput.refs.input)
      setTimeout(() => {
        expect(element.state.hasError).to.eq(true)
        done()
      }, 110)
    })
  })
})
