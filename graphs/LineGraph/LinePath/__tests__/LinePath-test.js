'use strict'

import LinePath from '../'

describe('LinePath', function() {
  var collection = [
    { series: [
      { date: 1, calculatedValue: 5 },
      { date: 2, calculatedValue: 22 },
      { date: 3, calculatedValue: 96 },
      { date: 4, calculatedValue: 5 },
      { date: 5, calculatedValue: 10 },
      { date: 6, calculatedValue: 24 }
    ] },
    { series: [
      { date: 1, calculatedValue: 4 },
      { date: 2, calculatedValue: 6 },
      { date: 3, calculatedValue: 90 },
      { date: 4, calculatedValue: 2 },
      { date: 5, calculatedValue: 4 },
      { date: 6, calculatedValue: 23 }
    ] }
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
      component = renderIntoDocument(
        <LinePath
          collection={ collection }
          width={ 200 }
          height={ height }
          index={ 0 }
          line
          area
          gutter={ gutters }
          className="classname1"
          collectionValueKey="" />
      );
    });

    it('should render LinePath', function() {
      component.should.exist;
    });

    it('should render item with given className', function() {
      var lines = scryByClass(component, 'classname1');

      lines.length.should.equal(1);
    });

    it('should render a line', function() {
      var lines = scryByClass(component, 'hui-LinePath__line');

      lines.length.should.equal(1);
    });

    it('should render a area', function() {
      var lines = scryByClass(component, 'hui-LinePath__area');

      lines.length.should.equal(1);
    });

    it('should render the correct drawigHeight', function() {
      component.getDrawingHeight().should.equal(height - gutters.top - gutters.bottom);
    });

    it('should render the correct getScalePercentage', function() {
      component.getScalePercentage().should.equal(0.96);
    });

    it('should render the correct getPathHeight', function() {
      component.getPathDrawingHeight().should.equal(96);
    });

    it('should render the correct getTranslateY', function() {
      height = component.getTranslateY() + component.getPathDrawingHeight();

      height.should.equal(component.getDrawingHeight() + gutters.top);
    });
  });

  describe('area and line false', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(
        <LinePath
          collection={ collection }
          width={ 200 }
          height={ 200 }
          index={ 0 }
          line={ false }
          area={ false }
          gutter={ gutters }
          collectionValueKey="" />
      );
    });

    it('should not render a line', function() {
      var lines = scryByClass(component, 'hui-LinePath__line');

      lines.length.should.equal(0);
    });

    it('should not render a area', function() {
      var lines = scryByClass(component, 'hui-LinePath__area');

      lines.length.should.equal(0);
    });
  });
});
