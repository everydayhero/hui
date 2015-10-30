'use strict'

import Promise from 'bluebird'

describe('NavUser', () => {

  let userData = {
    name: 'Test User',
    image_url: 'http://test/path',
    page_ids: [1, 2, 3]
  }
  let success = new Promise.resolve({ dashboard_user: userData })
  let getJSON = sinon.stub()
  let NavUser = mockrequire('../', {
    '../../../lib/getJSON': getJSON
  })
  let onLoad = sinon.spy()
  let defaultProps = {
    domain: 'everydaytest.com',
    region: 'au',
    onLoad
  }

  beforeEach(() => onLoad.reset())

  it('shows onboarding calls to action without a user', (done) => {
    getJSON.returns(new Promise.reject('no user'))
    let element = renderIntoDocument(<NavUser { ...defaultProps }/>)
    setTimeout(() => {
      onLoad.should.not.have.been.called
      let register = findByClass(element, 'hui-Button--cta').getDOMNode()
      register.href.should.equal(`http://give.${defaultProps.domain}/au/get-started/`)
      register.textContent.should.contain('Get Started')

      let logIn = findByClass(element, 'hui-NavLink--cta').getDOMNode()
      logIn.href.should.equal(`http://${defaultProps.domain}/au/sign-in/`)
      logIn.textContent.should.contain('Log in')
      done()
    }, 15)
  })

  xit('loads a user', (done) => {
    getJSON.returns(success)
    let element = renderIntoDocument(<NavUser { ...defaultProps }/>)
    setTimeout(() => {
      onLoad.should.have.been.calledWith(userData)
      let user = findByClass(element, 'hui-NavUser__user').getDOMNode()
      user.href.should.equal(`https://${defaultProps.domain}/dashboard`)
      user.textContent.should.contain(userData.name)

      let avatar = findByTag(findByClass(element, 'hui-NavUser__avatar'), 'img').getDOMNode()
      avatar.src.should.equal(userData.image_url)
      done()
    }, 15)
  })

  xit('accepts a user', (done) => {
    getJSON.returns(success)
    let element = renderIntoDocument(<NavUser { ...defaultProps } user={ userData }/>)
    setTimeout(() => {
      onLoad.should.not.have.been.called
      let user = findByClass(element, 'hui-NavUser__user').getDOMNode()
      user.href.should.equal(`https://${defaultProps.domain}/dashboard`)
      user.textContent.should.contain(userData.name)

      let avatar = findByTag(findByClass(element, 'hui-NavUser__avatar'), 'img').getDOMNode()
      avatar.src.should.equal(userData.image_url)
      done()
    }, 15)
  })
})
