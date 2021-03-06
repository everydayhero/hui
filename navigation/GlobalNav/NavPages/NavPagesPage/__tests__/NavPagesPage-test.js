'use strict'

import ReactDOM from 'react-dom'
import NavPagesPage from '../'

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
  target_cents: 100000,
  amount: {
    cents: 50000,
    currency: {
      symbol: '$'
    }
  }
}

describe('NavPagesPage', () => {
  let page = renderIntoDocument(<NavPagesPage page={testPage} />)

  it('links to the page', () => {
    ReactDOM.findDOMNode(page).href.should.equal(testPage.url)
  })

  it('displays page image with page state icon', () => {
    findByTag(page, 'img').src.should.equal(testPage.image.small_image_url)
    findByClass(page, 'hui-NavPagesPage__icon').should.exist
  })

  it('displays page details', () => {
    let details = findByClass(page, 'hui-NavPagesPage__details').textContent
    details.should.contain(testPage.name)
    details.should.contain(testPage.charity_name)
    details.should.contain(testPage.campaign_name)
    details.should.contain('$500 raised')
  })

  it('displays a progress bar', () => {
    findByClass(page, 'hui-NavPagesPage__progressBar').style.width.should.equal('50%')
  })
})

