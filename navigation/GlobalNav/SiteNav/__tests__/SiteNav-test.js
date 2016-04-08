'use strict'

import SiteNav from '../'

let when = describe
let defaultProps = {
  kind: 'desktop',
  portal: 'http://everydaytest.com/au/',
  region: 'au',
  registerUrl: 'http:/everydaytest.com/register',
  hasUser: false
}

describe('SiteNav', () => {
  it('renders a search input', () => {
    let nav = renderIntoDocument(<SiteNav { ...defaultProps }/>)
    findByClass(nav, 'hui-NavSearch').should.exist
  })

  it('links to the wonderwall', () => {
    let nav = renderIntoDocument(<SiteNav { ...defaultProps }/>)
    let blog = findByAttribute(nav, 'href', `${defaultProps.portal}blog/`)
    blog.should.exist
    blog.textContent.should.equal('Wonderwall')
  })

  it('links to the help page', () => {
    let nav = renderIntoDocument(<SiteNav { ...defaultProps }/>)
    let help = findByAttribute(nav, 'href', `${defaultProps.portal}contact/`)
    help.should.exist
    help.textContent.should.equal('Help')
  })

  when('has no user', () => {
    it('links to the nonprofit page', () => {
      let nav = renderIntoDocument(<SiteNav { ...defaultProps }/>)
      let nonprofit = findByAttribute(nav, 'href', `${defaultProps.portal}nonprofits/`)
      nonprofit.should.exist
      nonprofit.textContent.should.equal('Nonprofit')
    })
  })

  when('has user', () => {
    it('shows user pages', () => {
      defaultProps.hasUser = true
      let nav = renderIntoDocument(<SiteNav { ...defaultProps }/>)
      findByClass(nav, 'hui-NavPages').should.exist
    })
  })
})
