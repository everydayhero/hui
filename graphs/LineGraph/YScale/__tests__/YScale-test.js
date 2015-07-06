'use strict';

var YScale = require('../index');

describe('YScale', function() {
  var collection = [
        { series: [
          { date: 1, calculatedValue: 5 },
          { date: 2, calculatedValue: 22 },
          { date: 3, calculatedValue: 14 },
          { date: 4, calculatedValue: 5 },
          { date: 5, calculatedValue: 10 },
          { date: 6, calculatedValue: 24 }
        ] },
        { series: [
          { date: 1, calculatedValue: 4 },
          { date: 2, calculatedValue: 6 },
          { date: 3, calculatedValue: 11 },
          { date: 4, calculatedValue: 2 },
          { date: 5, calculatedValue: 4 },
          { date: 6, calculatedValue: 23 }
        ] }
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
      component = renderIntoDocument(
        <YScale
          collection={ collection }
          height={ 200 }
          width={ 200 }
          gutter= { gutters } />
      );
    });

    it('should render YScale', function() {
      component.should.exist;
    });

    it('renders the correct labels', function() {
      var scaleLabels = scryByClass(component, 'hui-YScale__label');
      var label = 0, i = 0

      for (i; i < scaleLabels.length; i++) {
        scaleLabels[i].getDOMNode().textContent.should.contain(label.toString());
        label += 5;
      }
    });

    it('renders the correct number of scale lines', function() {
      var scaleLines = scryByClass(component, 'hui-YScale__line');

      scaleLines.length.should.equal(6);
    });
  });
});
