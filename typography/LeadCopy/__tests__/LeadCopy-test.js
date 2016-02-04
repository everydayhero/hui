'use strict'

import LeadCopy from '../'

describe('LeadCopy', () => {
  it('displays arbitrary copy', () => {
    let element = renderIntoDocument(<LeadCopy>This is a test</LeadCopy>)
    element.getDOMNode().textContent.should.eql('This is a test')
  })
})
