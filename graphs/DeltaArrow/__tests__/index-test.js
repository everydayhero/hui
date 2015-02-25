/** @jsx React.DOM */
"use strict";

jest.autoMockOff();

describe('DeltaArrow', function() {
  var React      = require('react/addons');
  var DeltaArrow = require('../index');
  var TestUtils  = React.addons.TestUtils;

  describe('with positive number', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<DeltaArrow delta={ 50 } />);
    });

    it('should point upwards', function() {
      TestUtils.findRenderedDOMComponentWithClass(component, 'DeltaArrow--up');
    });
  });

  describe('with negative number', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<DeltaArrow delta={ -50 } />);
    });

    it('should point upwards', function() {
      TestUtils.findRenderedDOMComponentWithClass(component, 'DeltaArrow--down');
    });
  });
});
