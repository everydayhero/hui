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
      component = TestUtils.renderIntoDocument(<DeltaArrow delta={ 0.1234 } />);
    });

    it('should point upwards', function() {
      TestUtils.findRenderedDOMComponentWithClass(component, 'hui-DeltaArrow--up');
    });

    it('should render formatted percentage', function() {
      node = TestUtils.findRenderedDOMComponentWithClass(component, 'hui-DeltaArrow__value');
      expect(node.getDOMNode().textContent).toEqual('12%');
    });
  });

  describe('with negative number', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<DeltaArrow delta={ -0.5 } />);
    });

    it('should point downwards', function() {
      TestUtils.findRenderedDOMComponentWithClass(component, 'hui-DeltaArrow--down');
    });

    it('should render formatted percentage', function() {
      node = TestUtils.findRenderedDOMComponentWithClass(component, 'hui-DeltaArrow__value');
      expect(node.getDOMNode().textContent).toEqual('50%');
    });
  });
});
