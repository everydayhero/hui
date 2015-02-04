/** @jsx React.DOM */
"use strict";

jest.dontMock('../index');

describe('AuthStatus', function() {
  var React       = require('react/addons');
  var AuthStatus  = require('../index');
  var TestUtils   = React.addons.TestUtils;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<AuthStatus/>);
    });

    it('should render AuthStatus', function() {
      expect(component).not.toBeNull();
    });
  });
});
