'use strict'

import Promise from 'bluebird'
const proxyquire = require('proxyquire')
  .noCallThru()
  .noPreserveCache()

let userData = {
  name: 'Test User',
  image_url: 'http://test/path',
  page_ids: [1, 2, 3]
}
let success = Promise.resolve({ dashboard_user: userData })
let getJSON = sinon.stub()
let onLoad = sinon.spy()
let defaultProps = {
  domain: 'everydaytest.com',
  region: 'au',
  onLoad
}

const NavUser = proxyquire('../', {
  '../../../lib/getJSON': getJSON
}).default

describe('NavUser', () => {
  beforeEach(() => onLoad.reset())

  it('shows onboarding calls to action without a user', (done) => {
    getJSON.returns(Promise.reject('no user'))
    let element = renderIntoDocument(<NavUser {...defaultProps} />)
    setTimeout(() => {
      onLoad.should.not.have.been.called
      let register = findByClass(element, 'hui-Button--cta')
      register.href.should.equal(`http://give.${defaultProps.domain}/au/get-started/`)
      register.textContent.should.contain('Get Started')

      let logIn = findByClass(element, 'hui-NavLink--cta')
      logIn.href.should.equal(`http://${defaultProps.domain}/au/sign-in/`)
      logIn.textContent.should.contain('Log in')
      done()
    }, 15)
  })

  it('loads a user', (done) => {
    getJSON.returns(success)
    let element = renderIntoDocument(<NavUser {...defaultProps} />)
    setTimeout(() => {
      onLoad.should.have.been.calledWith(userData)
      let user = findByClass(element, 'hui-NavUser__user')
      user.href.should.equal(`https://${defaultProps.domain}/dashboard`)
      user.textContent.should.contain(userData.name)

      let avatar = findByTag(element, 'img')
      avatar.src.should.equal(userData.image_url)
      done()
    }, 15)
  })

  it('accepts a user', (done) => {
    getJSON.returns(success)
    let element = renderIntoDocument(<NavUser {...defaultProps} user={userData} />)
    setTimeout(() => {
      onLoad.should.not.have.been.called
      let user = findByClass(element, 'hui-NavUser__user')
      user.href.should.equal(`https://${defaultProps.domain}/dashboard`)
      user.textContent.should.contain(userData.name)

      let avatar = findByTag(element, 'img')
      avatar.src.should.equal(userData.image_url)
      done()
    }, 15)
  })
})
