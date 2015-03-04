/** @jsx React.DOM */
"use strict";

jest.autoMockOff();

describe('LinePath', function() {
  var React     = require('react/addons');
  var LinePath    = require('../index');
  var TestUtils = React.addons.TestUtils;
  var series = [
        [
          { date: 1, calculatedValue: 5 },
          { date: 2, calculatedValue: 22 },
          { date: 3, calculatedValue: 96 },
          { date: 4, calculatedValue: 5 },
          { date: 5, calculatedValue: 10 },
          { date: 6, calculatedValue: 24 }
        ],
        [
          { date: 1, calculatedValue: 4 },
          { date: 2, calculatedValue: 6 },
          { date: 3, calculatedValue: 90 },
          { date: 4, calculatedValue: 2 },
          { date: 5, calculatedValue: 4 },
          { date: 6, calculatedValue: 23 }
        ]
      ];

  var gutters = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  }

  var height = 120;

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <LinePath
          series={ series }
          width={ 200 }
          height={ height }
          index={ 0 }
          line={ true }
          area={ true }
          gutter={ gutters } />
      );
    });

    it('should render LinePath', function() {
      expect(component).not.toBeNull();
    });

    it('should render a line', function() {
      var lines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'hui-LinePath__line');

      expect(lines.length).toBe(1);
    });

    it('should render a area', function() {
      var lines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'hui-LinePath__area');

      expect(lines.length).toBe(1);
    });

    it('should render the correct drawigHeight', function() {
      expect(component.getDrawingHeight()).toBe(height - gutters.top - gutters.bottom);
    });

    it('should render the correct getScalePercentage', function() {
      expect(component.getScalePercentage()).toBe(0.96);
    });

    it('should render the correct getPathHeight', function() {
      expect(component.getPathHeight()).toBe(96);
    });

    it('should render the correct getTranslateY', function() {
      var height = component.getTranslateY() + component.getPathHeight();

      expect(height).toBe(component.getDrawingHeight() + gutters.top);
    });
  });

  describe('area and line false', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <LinePath
          series={ series }
          width={ 200 }
          height={ 200 }
          index={ 0 }
          line={ false }
          area={ false }
          gutter={ gutters } />
      );
    });

    it('should not render a line', function() {
      var lines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'hui-LinePath__line');

      expect(lines.length).toBe(0);
    });

    it('should not render a area', function() {
      var lines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'hui-LinePath__area');

      expect(lines.length).toBe(0);
    });
  });
});
