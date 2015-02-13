/** @jsx React.DOM */
"use strict";

jest.autoMockOff();

describe('XScale', function() {
  var React     = require('react/addons');
  var XScale    = require('../index');
  var TestUtils = React.addons.TestUtils;

  var series = [
        [
          { date: new Date("2014, 1").toISOString(), calculatedValue: 5 },
          { date: new Date("2014, 2").toISOString(), calculatedValue: 22 },
          { date: new Date("2014, 3").toISOString(), calculatedValue: 14 },
          { date: new Date("2014, 4").toISOString(), calculatedValue: 5 },
          { date: new Date("2014, 5").toISOString(), calculatedValue: 10 },
          { date: new Date("2014, 6").toISOString(), calculatedValue: 24 }
        ],
        [
          { date: new Date("2014, 1").toISOString(), calculatedValue: 4 },
          { date: new Date("2014, 2").toISOString(), calculatedValue: 6 },
          { date: new Date("2014, 3").toISOString(), calculatedValue: 11 },
          { date: new Date("2014, 4").toISOString(), calculatedValue: 2 },
          { date: new Date("2014, 5").toISOString(), calculatedValue: 4 },
          { date: new Date("2014, 6").toISOString(), calculatedValue: 23 }
        ]
      ];

  var gutters = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20
  }

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <XScale
          series={ series }
          width={ 200 }
          height={ 200 }
          gutter={ gutters } />
      );
    });

    it('should render XScale', function() {
      expect(component).not.toBeNull();
    });

    it('renders the correct number of labels', function() {
      var scaleLines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'XScale__label');

      expect(scaleLines.length).toBe(3)
    });

    it('renders the correct labels', function() {
      var scaleLabels = TestUtils.scryRenderedDOMComponentsWithClass(component, 'XScale__label');
      var label = 0;

      expect(scaleLabels[0].getDOMNode().textContent).toBe('Jan 1');
      expect(scaleLabels[1].getDOMNode().textContent).toBe('Mar 1');
      expect(scaleLabels[2].getDOMNode().textContent).toBe('May 1');
    });
  });
});
