'use strict';

var TopBarLink  = require('../index');

describe('TopBarLinkLink', function() {
  var component;

  beforeEach(function() {
    component = renderIntoDocument(<TopBarLink href="foo"/>);
  });

  it('should render TopBarLink', function() {
    component.should.exist;
  });

  it('should render a href', function() {
    var href = findByTag(component, 'a').getDOMNode().href;

    href.should.contain('foo');
  });
});
