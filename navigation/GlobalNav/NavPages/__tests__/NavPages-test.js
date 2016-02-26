'use strict'

import Promise from 'bluebird'

const proxyquire = require('proxyquire')
  .noCallThru()
  .noPreserveCache()

let testPage = {
  name: 'Test Page',
  charity_name: 'Test Charity',
  campaign_name: 'Test Campaign',
  url: 'http://test/page/url',
  image: {
    small_image_url: 'http://path/to/small/image'
  },
  campaign_uid: 'test-3535',
  expires_at: new Date().toISOString(),
  state: 'active',
  target_cents: 1000,
  amount: {
    cents: 500,
    currency: {
      symbol: '$'
    }
  }
}
let results = { pages: [testPage] }
let success = Promise.resolve(results)

let defaultProps = {
  kind: 'desktop',
  registerUrl: 'http://test/path',
  pages: [1]
}

let pages
const NavPages = proxyquire('../', {
  '../../../lib/getJSON': sinon.stub().returns(success)
}).default

describe('NavPages', () => {
  before(() => {
    pages = renderIntoDocument(<NavPages { ...defaultProps }/>)
  })
  it('displays a list on focus', () => {
    let button = pages.refs.button
    expect(pages.refs.list).to.not.exist

    Simulate.focus(button)
    pages.refs.list.should.exist
  })

  it('contains page links', () => {
    let list = pages.refs.list.textContent
    list.should.contain(testPage.name)
    list.should.contain(testPage.charity_name)
    list.should.contain(testPage.campaign_name)
    list.should.contain('Create new page')
  })
})

