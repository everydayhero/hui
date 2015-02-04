/** @jsx React.DOM */
"use strict";

jest.dontMock('../index');
jest.dontMock('../../../../mixins/assests');

describe('Masthead', function() {
  var React       = require('react/addons');
  var Masthead        = require('../index');
  var TestUtils   = React.addons.TestUtils;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<Masthead/>);
      document.implementation.hasFeature = function() {
        return true;
      }
    });

    it('should render Masthead', function() {
      expect(component).not.toBeNull();
    });

    it('should not render application name', function() {
      expect(scryByClass(component, 'UIlib-Masthead__applicationName').length).toBe(0);
    });

    it('should render a svg logo', function() {
      var src = findByClass(component, 'UIlib-Masthead__logo').getDOMNode().src;

      expect(src).toContain('svg');
    });
  });

  describe('application Name', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<Masthead applicationName="foo" />);
    });

    it('should render application name', function() {
      expect(scryByClass(component, 'UIlib-Masthead__applicationName').length).toBe(1);
    });
  });

  describe('gif logo', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<Masthead applicationName="foo" />);
      document.implementation.hasFeature = function() {
        return false;
      }
    });

    it('should render a gif logo', function() {
      var src = findByClass(component, 'UIlib-Masthead__logo').getDOMNode().src;

      expect(src).toContain('svg');
    });
  });
});
