'use strict'

import PrimaryNav from '../index'
import PrimaryNavLink from '../PrimaryNavLink/index'
import PrimaryNavLinkSeperator from '../PrimaryNavLinkSeperator/index'

describe('PrimaryNav', function() {
  var primaryNav;

  beforeEach(function() {
    primaryNav = renderIntoDocument(
      <PrimaryNav reduce={ false }>
        <PrimaryNavLink icon="ship" active={ false } isDashboardLink={ true }>
          Menu Item 1
        </PrimaryNavLink>
        <PrimaryNavLinkSeperator />
        <PrimaryNavLink icon="search" active={ true }>
          Menu Item 2
        </PrimaryNavLink>
      </PrimaryNav>
    );
  })

  it('renders', function() {
    primaryNav.should.exist;
  })
})
