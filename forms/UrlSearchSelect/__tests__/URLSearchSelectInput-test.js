'use strict';

import Promise from 'bluebird'

var mockResult = {
  resources: [
    { label: 'Label', value: 'Value' }
  ]
}

var mockGetJSON = sinon.spy(function () {
  return new Promise((resolve) => {
    return resolve(mockResult)
  })
})

var mockDebounce = function (func) {
  return func
}

var UrlSearchSelect = mockrequire('../', {
  '../../lib/getJSON': mockGetJSON,
  'lodash/function/debounce': mockDebounce
})

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
        <UrlSearchSelect params={ { some: 'Param' }  }  url="http://everydayhero.com" />
      )
      element.setState({
        queryValue: 'foobar'
      })
      element.fetchResults()

      expect(mockGetJSON).calledWith('http://everydayhero.com', {
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

  describe('#queueResultFetch', () => {
    it('cancels the previous pending request', (done) => {
      let element = renderIntoDocument(
        <UrlSearchSelect url="http://everydayhero.com" />
      )
      let one = element.queueResultFetch()
      sinon.spy(one, 'cancel')
      element.queueResultFetch().done(() => {
        expect(one.cancel).to.be.called
        done()
      })
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
})
