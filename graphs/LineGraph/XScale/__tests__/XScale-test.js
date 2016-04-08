'use strict'

import XScale from '../'

describe('XScale', function() {
  var collection = [
    { series: [
      { date: new Date('2014, 1').toISOString(), calculatedValue: 5 },
      { date: new Date('2014, 2').toISOString(), calculatedValue: 22 },
      { date: new Date('2014, 3').toISOString(), calculatedValue: 14 },
      { date: new Date('2014, 4').toISOString(), calculatedValue: 5 },
      { date: new Date('2014, 5').toISOString(), calculatedValue: 10 },
      { date: new Date('2014, 6').toISOString(), calculatedValue: 24 }
    ] },
    { series: [
      { date: new Date('2014, 1').toISOString(), calculatedValue: 4 },
      { date: new Date('2014, 2').toISOString(), calculatedValue: 6 },
      { date: new Date('2014, 3').toISOString(), calculatedValue: 11 },
      { date: new Date('2014, 4').toISOString(), calculatedValue: 2 },
      { date: new Date('2014, 5').toISOString(), calculatedValue: 4 },
      { date: new Date('2014, 6').toISOString(), calculatedValue: 23 }
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
        <XScale
          collection={ collection }
          width={ 200 }
          height={ 200 }
          gutter={ gutters } />
      );
    });

    it('should render XScale', function() {
      component.should.exist;
    });

    it('renders the correct number of labels', function() {
      var scaleLines = scryByClass(component, 'hui-XScale__label');

      scaleLines.length.should.equal(2)
    });

    it('renders the correct labels', function() {
      var scaleLabels = scryByClass(component, 'hui-XScale__label');

      scaleLabels[0].textContent.should.equal('Jan 1');
      scaleLabels[1].textContent.should.equal('Apr 1');
    });
  });
});
