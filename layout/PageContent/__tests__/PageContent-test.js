'use strict'

import PageContent from '../'

describe('PageContent', () => {
  it('renders an icon banner above arbitrary children', () => {
    let element = renderIntoDocument(<PageContent>Test content</PageContent>)
    element.getDOMNode().textContent.should.eql('Test content')
    findByClass(element, 'IconBanner').should.exist
  })
})
