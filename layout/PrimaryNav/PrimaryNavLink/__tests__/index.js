'use strict'

import PrimaryNavLink from '../index'

describe('PrimaryNavLink', function() {
  var primaryNavLink;
  let onChange = sinon.spy()

  beforeEach(function() {
    primaryNavLink = renderIntoDocument(
      <PrimaryNavLink clickHandler={ onChange }>
        example
      </PrimaryNavLink>
    );

    onChange.reset()
  })

  it('clicks', function() {
    let buttons = scryByClass(primaryNavLink, 'Navigation__link')

    Simulate.click(buttons[0])

    onChange.should.have.been.calledOnce
  })
})
