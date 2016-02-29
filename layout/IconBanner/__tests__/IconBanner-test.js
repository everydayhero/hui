'use strict'

import IconBanner from '../'

describe('IconBanner', () => {
  it('displays a bitching icon with circles and shit', () => {
    let element = renderIntoDocument(<IconBanner />)
    findByClass(element, 'IconBanner').should.exist
    findByClass(element, 'IconBanner__icon').should.exist
    findByClass(element, 'fa-heart-o').should.exist
  })
})
