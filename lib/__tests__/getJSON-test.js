/*jshint expr: true*/

'use strict'

import ExecutionEnvironment from 'exenv'
import mockrequire from 'mockrequire'

let url = 'http://jsonplaceholder.typicode.com/posts/1'
let incorrectUrl = 'http://this.should.not/work'
let fakeData = {
  name: 'fakeName',
  id: 100
}

let mockSuperagent = {
  get (reqUrl) {
    return {
      use () {
        return this
      },
      query () {
        return this
      },
      withCredentials () {
        return this
      },
      end (callback) {
        if (reqUrl === incorrectUrl) {
          callback('Wrong', null)
        } else {
          callback(null, fakeData)
        }
        return this
      },
      abort () {
        return this
      }
    }
  }
}

let getJSON = mockrequire('../getJSON', {
  'superagent': mockSuperagent
})

describe('getJSON', () => {
  it('returns a promise', done => {
    ExecutionEnvironment.canUseDOM = false
    getJSON(url).then(res => {
      res.should.exist
      done()
    }).catch(() => { done() })
  })

  it('returns an error on incorrect url', done => {
    getJSON(incorrectUrl).catch(function(err) {
      err.should.exist
      done()
    })
  })

  it("won't cache on the server", done => {
    ExecutionEnvironment.canUseDOM = false
    getJSON(url, null, null, fakeData).then(res => {
      res.should.not.equal(fakeData)
      done()
    }).catch(() => { done() })
  })

  it('caches deserialized data on the client', done => {
    ExecutionEnvironment.canUseDOM = true
    getJSON(url, null, null, fakeData).then(res => {
      res.should.equal(fakeData)
      done()
    }).catch(() => { done() })
  })

  it('returns a cached result on the client', done => {
    ExecutionEnvironment.canUseDOM = true
    getJSON(url).then(res => {
      res.should.equal(fakeData)
      done()
    }).catch(() => { done() })
  })
})
