/** @jsx React.DOM */
"use strict";

jest.dontMock('../index');

describe('Masthead', function() {
  var React       = require('react/addons');
  var Masthead        = require('../index');
  var TestUtils   = React.addons.TestUtils;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;

  describe('default', function() {
    var component;

    beforeEach(function() {
      document.implementation.hasFeature = function() {
        return true;
      };
      component = TestUtils.renderIntoDocument(<Masthead imagePath="/" href="foo"/>);
    });

    it('should render Masthead', function() {
      expect(component).not.toBeNull();
    });

    it('should not render application name', function() {
      expect(scryByClass(component, 'hui-Masthead__appName').length).toBe(0);
    });

    it('should render a svg logo', function() {
      var src = findByClass(component, 'hui-Masthead__logo').getDOMNode().src;

      expect(src).toContain('svg');
    });

    it('should render a anchor with href foo', function() {
      var href = findByTag(component, 'a').getDOMNode().href;

      expect(href).toContain('foo');
    });
  });

  describe('application Name', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<Masthead appName="foo" imagePath="/"/>);
    });

    it('should render application name', function() {
      expect(scryByClass(component, 'hui-Masthead__appName').length).toBe(1);
    });
  });

  describe('gif logo', function() {
    var component;

    beforeEach(function() {
      document.implementation.hasFeature = function() {
        return false;
      };
      component = TestUtils.renderIntoDocument(<Masthead appName="foo" imagePath="/"/>);
    });

    it('should render a gif logo', function() {
      var src = findByClass(component, 'hui-Masthead__logo').getDOMNode().src;
      expect(src).toContain('gif');
    });
  });
});
