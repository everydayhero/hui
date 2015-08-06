'use strict'

import NavLink from '../'
let when = describe
let defaultProps = {
  label: 'TestLabel',
  href: 'http://test/path',
  kind: 'cta'
}

describe('NavLink', () => {
  it('renders', () => {
    let link = renderIntoDocument(<NavLink { ...defaultProps }/>)
    link.getDOMNode().textContent.should.contain(defaultProps.label)
    link.getDOMNode().href.should.equal(defaultProps.href)
    findByClass(link, 'hui-NavLink--cta').should.exist
  })

  it('can display as active', () => {
    window.location.href = defaultProps.href
    let link = renderIntoDocument(<NavLink { ...defaultProps }/>)
    findByClass(link, 'hui-NavLink--active').should.exist
  })

  it('executes an onBlur handler', () => {
    let onBlur = sinon.spy()
    let link = renderIntoDocument(<NavLink { ...defaultProps } onBlur={ onBlur }/>)
    Simulate.blur(link.getDOMNode())
    onBlur.should.have.been.called
  })

  when('kind = desktop', () => {
    it('can display an icon', () => {
      defaultProps.kind = 'desktop'
      let link = renderIntoDocument(<NavLink { ...defaultProps } icon="rocket"/>)
      findByClass(link, 'hui-NavLink--desktop').should.exist
      findByClass(link, 'fa-rocket').should.exist
    })
  })

  when('kind = account', () => {
    it('can display an icon', () => {
      defaultProps.kind = 'account'
      let link = renderIntoDocument(<NavLink { ...defaultProps } icon="rocket"/>)
      findByClass(link, 'hui-NavLink--account').should.exist
      findByClass(link, 'fa-rocket').should.exist
    })
  })
})
