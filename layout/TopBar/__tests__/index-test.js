/** @jsx React.DOM */
"use strict";

jest.dontMock('../index');

describe('TopBar', function() {
  var React     = require('react/addons');
  var TopBar    = require('../index');
  var TestUtils = React.addons.TestUtils;

  describe('default', function() {
    var topBar;

    beforeEach(function() {
      topBar = TestUtils.renderIntoDocument(<TopBar/>);
    });

    it('should render TopBar', function() {
      expect(topBar).not.toBeNull();
    });
  });
});
