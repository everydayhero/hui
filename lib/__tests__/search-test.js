'use strict'

import Promise from 'bluebird'
let results = { results: [], meta: {}}
let success = Promise.resolve(results)
let search = mockrequire('../search', {
  './getJSON': sinon.stub().returns(success)
})

describe('search', () => {
  describe('aggregate', () => {
    it('searches for everything', done => {
      let query = { searchTerm: 'bar', country: 'xy', page: 2, pageSize: 7, minimumScore: 0.05 };
      search.all(query).then(res => {
        res.should.equal(results)
        done()
      });
    });
  });
});
