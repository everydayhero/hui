/** @jsx React.DOM */
"use strict";

jest.dontMock('../index');
jest.dontMock('moment');

describe('Demo Page', function() {
  var React     = require('react/addons');
  var Page      = require('../index');
  var TestUtils = React.addons.TestUtils;

  describe('default', function() {
    var page;

    beforeEach(function() {
      page = TestUtils.renderIntoDocument(<Page/>);
    });

    it('should render Page', function() {
      expect(page).not.toBeNull();
    });
  });
});
