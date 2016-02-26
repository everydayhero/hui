'use strict'

import GlobalNav from '../'
let when = describe
let defaultProps = {
  domain: 'everydaytest.com',
  region: 'au',
  imgPath: 'image/path/'
}
let campaign = {
  name: 'TestCampaign',
  detail: 'TestDetail',
  url: 'http://path/to/campaign'
}
let user = {
  name: 'TestUser',
  image_url: 'path/to/image',
  page_ids: [1, 2, 3]
}

describe('GlobalNav', () => {
  it('should contain a desktop and mobile nav', () => {
    let nav = renderIntoDocument(<GlobalNav { ...defaultProps }/>)
    findByClass(nav, 'hui-SiteNav--desktop').should.exist
    findByClass(nav, 'hui-SiteNav--mobile').should.exist
  })

  when('no campaign provided', () => {
    let nav = renderIntoDocument(<GlobalNav { ...defaultProps }/>)
    it('should render the logo', () => {
      let logo = findByClass(nav, 'hui-GlobalNav__logo')
      logo.href.should.equal(`http://www.${defaultProps.domain}/au/`)
      findByAttribute(nav, 'src', `${defaultProps.imgPath}hui_edh_logo@x2.png`)
    })
  })

  when('campaign provided with user', () => {
    let nav = renderIntoDocument(<GlobalNav { ...defaultProps } campaign={ campaign } user={ user }/>)
    it('should render the logo', () => {
      findByAttribute(nav, 'src', `${defaultProps.imgPath}hui_edh_logo@x2.png`)
    })
  })

  when('campaign provided without user', () => {
    let nav = renderIntoDocument(<GlobalNav { ...defaultProps } campaign={ campaign }/>)
    it('should render the campaign details', () => {
      let campaignDetails = findByClass(nav, 'hui-GlobalNav__campaign')
      campaignDetails.href.should.equal(campaign.url)
      campaignDetails.textContent.should.contain(campaign.name)
      campaignDetails.textContent.should.contain(campaign.detail)
    })
  })

  when('transparent', () => {
    let nav = renderIntoDocument(<GlobalNav { ...defaultProps } transparent={ true }/>)
    it('should be transparent', () => {
      findByClass(nav, 'hui-GlobalNav--transparent').should.exist
    })
  })
})
