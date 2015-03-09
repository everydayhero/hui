"use strict";

jest.autoMockOff();

describe('UserAuth', function() {
  var React     = require('react/addons');
  var UserAuth    = require('../index');
  var TestUtils = React.addons.TestUtils;

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<UserAuth signInHref="#" signUpHref="#"/>);
    });

    it('should render UserAuth', function() {
      expect(component).not.toBeNull();
    });

    it('should render a Sign Up link', function() {
      var node = TestUtils.findRenderedDOMComponentWithClass(component, 'hui-Button');

      expect(node.getDOMNode().textContent).toContain('Sign Up');
    });

    it('should render a Sign In link', function() {
      var node = TestUtils.findRenderedDOMComponentWithClass(component, 'hui-UserAuth__signIn');

      expect(node.getDOMNode().textContent).toContain('Sign In');
    });
  });
});
