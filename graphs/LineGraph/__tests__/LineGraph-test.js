'use strict';

var LineGraph = require('../index');

describe('LineGraph', function() {
  var collection = [
    {
      series: [
        { date: new Date('2014, 1').toISOString(), value: 5 },
        { date: new Date('2014, 2').toISOString(), value: 22 },
        { date: new Date('2014, 3').toISOString(), value: 14 },
        { date: new Date('2014, 4').toISOString(), value: 5 },
        { date: new Date('2014, 5').toISOString(), value: 10 },
        { date: new Date('2014, 6').toISOString(), value: 24 }
      ]
    },
    {
      series: [
        { date: new Date('2014, 1').toISOString(), value: 4 },
        { date: new Date('2014, 2').toISOString(), value: 6 },
        { date: new Date('2014, 3').toISOString(), value: 11 },
        { date: new Date('2014, 4').toISOString(), value: 2 },
        { date: new Date('2014, 5').toISOString(), value: 4 },
        { date: new Date('2014, 6').toISOString(), value: 23 }
      ]
    }
  ];

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(<LineGraph collection={ collection } collectionValueKey={'value'} />);
      component.setState({
        width: 200,
        height: 200
      });
    });

    it('should render LineGraph', function() {
      component.should.exist;
    });

    it('should render a equal number of paths to sets in collection', function() {
      var linePaths = scryByClass(component, 'hui-LinePath');

      linePaths.length.should.equal(collection.length);
    });

    it('should transform set series when stacked', function() {
      var transformedCollection = component.transformCollection();
      var secondIndex = transformedCollection[1];

      for (var i = 0; i < secondIndex.length; i++) {
        secondIndex[i].calculatedValue.should.equal(secondIndex[i].value);
      }
    });
  });

  describe('empty set', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(<LineGraph collection={ [] } collectionValueKey={'value'} />);
      component.setState({
        width: 200,
        height: 200
      });
    });

    it('should render LineGraph', function() {
      component.should.exist;
    });
  });

  describe('stacked', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(<LineGraph collection={ collection } stacked={ true } collectionValueKey={'value'} />);
      component.setState({
        width: 200,
        height: 200
      });
    });

    it('should transform series collection when stacked', function() {
      var transformedCollection = component.transformCollection();
      var firstIndex = transformedCollection[0];
      var secondIndex = transformedCollection[1];

      for (var i = 0; i < secondIndex.length; i++) {
        secondIndex[i].calculatedValue.should.equal(secondIndex[i].value + firstIndex[i].value);
      }
    });
  });
});
