'use strict'

import ReactDOM from 'react-dom'
import LeadCopy from '../'

describe('LeadCopy', () => {
  it('displays arbitrary copy', () => {
    let element = renderIntoDocument(<LeadCopy>This is a test</LeadCopy>)
    ReactDOM.findDOMNode(element).textContent.should.eql('This is a test')
  })
})
