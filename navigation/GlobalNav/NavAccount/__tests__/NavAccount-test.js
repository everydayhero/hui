'use strict'

import NavAccount from '../'
let defaultProps = {
  domain: 'everydaytest.com',
  region: 'au'
}

describe('NavAccount', () => {
  let nav = renderIntoDocument(<NavAccount { ...defaultProps }/>)
  let button = nav.refs.button

  it('displays a list on focus', () => {
    expect(nav.refs.list).to.not.exist
    Simulate.focus(button)
    nav.refs.list.should.exist
  })

  it('contains account links', () => {
    let list = nav.refs.list.textContent
    list.should.contain('Receipts')
    list.should.contain('Account')
    list.should.contain('Log Out')
  })
})
