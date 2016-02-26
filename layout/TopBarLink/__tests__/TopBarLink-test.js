'use strict'

import TopBarLink from '../index'

describe('TopBarLinkLink', function() {
  var component;

  beforeEach(function() {
    component = renderIntoDocument(<TopBarLink href="foo"/>);
  });

  it('should render TopBarLink', function() {
    component.should.exist;
  });

  it('should render a href', function() {
    var href = findByTag(component, 'a').href;

    href.should.contain('foo');
  });
});
