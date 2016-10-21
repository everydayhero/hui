'use strict'

import Promise from 'bluebird'

const proxyquire = require('proxyquire')
  .noCallThru()
  .noPreserveCache()

let results = { results: [], meta: {} }
let success = Promise.resolve(results)

const search = proxyquire('../search', {
  './getJSON': sinon.stub().returns(success)
}).default

describe('search', () => {
  describe('aggregate', () => {
    it('searches for everything', done => {
      let query = { searchTerm: 'bar', country: 'xy', page: 2, pageSize: 7, minimumScore: 0.05 }
      search.all(query).then(res => {
        res.should.equal(results)
        done()
      })
    })
  })
})
