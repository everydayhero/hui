'use strict'

import PageContent from '../'

describe('PageContent', () => {
  it('renders an icon banner above arbitrary children', () => {
    let element = renderIntoDocument(<PageContent>Test content</PageContent>)
    findDOMNode(element).textContent.should.eql('Test content')
    findByClass(element, 'IconBanner').should.exist
  })
})
