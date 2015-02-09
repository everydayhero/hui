/** @jsx React.DOM */
"use strict";

jest.dontMock('../index');

describe('TopBarLinkLink', function() {
  var React       = require('react/addons');
  var TopBarLink  = require('../index');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<TopBarLink href="foo"/>);
    });

    it('should render TopBarLink', function() {
      expect(component).not.toBeNull();
    });

    it('should render a href', function() {
      var href = findByTag(component, 'a').getDOMNode().href;

      expect(href).toContain('foo');
    });
  });
});
