'use strict';

import map from 'lodash/map'
import YScale from '../'

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

  var textContent = function(label) { return label.textContent; };
  var scryLabels = function(component, transform) { return map(scryByClass(component, 'hui-YScale__label'), transform); };

  describe('scaleUnits', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(
        <YScale
          scaleUnit="m"
          collection={ collection }
          height={ 200 }
          width={ 200 }
          gutter= { gutters } />
      );
    });

    it('renders the correct labels with scaleUnit', function() {
      var labels = scryLabels(component, textContent);
      labels.should.include('0 m');
      labels.should.include('5 m');
      labels.should.include('10 m');
      labels.should.include('15 m');
      labels.should.include('20 m');
      labels.should.include('25 m');
    });
  });

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
      var labels = scryLabels(component, textContent);
      labels.should.include('0 ');
      labels.should.include('5 ');
      labels.should.include('10 ');
      labels.should.include('15 ');
      labels.should.include('20 ');
      labels.should.include('25 ');
    });

    it('renders the correct number of scale lines', function() {
      var scaleLines = scryByClass(component, 'hui-YScale__line');
      scaleLines.length.should.equal(6);
    });
  });
});
