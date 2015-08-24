'use strict';

var scaleMixin = require('../scaleMixin');

describe('scaleMixin', function() {
  describe('minUpperBound', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 200,
        collection: [
          { series: [{ calculatedValue: 0 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives upperBound of 200', function() {
      scaleMixin.getUpperBound().should.equal(200);
    });
  });

  describe('max 999', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: 999 }, { calculatedValue: 70 }] },
          { series: [{ calculatedValue: 566.6 }, { calculatedValue: 5 }] }
        ]
      };
    });

    it('gives the max calculatedValue of 999', function(){
      scaleMixin.getMax().should.equal(999);
    });

    it('gives getMaxForIndex of 566.6', function() {
      scaleMixin.getMaxForIndex(1).should.equal(566.6);
    });

    it('gives upperBound of 1000', function() {
      scaleMixin.getUpperBound().should.equal(1000);
    });
  });

  describe('max 24', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: 5 }, { calculatedValue: -23 }] },
          { series: [{ calculatedValue: 3 }, { calculatedValue: 24 }] }
        ]
      };
    });

    it('gives the max calculatedValue of 24', function(){
      scaleMixin.getMax().should.equal(24);
    });

    it('gives getMaxForIndex of 5', function() {
      scaleMixin.getMaxForIndex(0).should.equal(5);
    });

    it('gives upperBound of 25', function() {
      scaleMixin.getUpperBound().should.equal(25);
    });
  });

  describe('max 0.71', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: 0.123 }, { calculatedValue: 0.71 }] },
          { series: [{ calculatedValue: 0.5666 }, { calculatedValue: 0.5 }] }
        ]
      };
    });

    it('gives the max calculatedValue of 0.71', function(){
      scaleMixin.getMax().should.equal(0.71);
    });

    it('gives getMaxForIndex of 0.5666', function() {
      scaleMixin.getMaxForIndex(1).should.equal(0.5666);
    });

    it('gives upperBound of 0.75', function() {
      scaleMixin.getUpperBound().should.equal(0.75);
    });
  });

  describe('max 0.5', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: 0.123 }, { calculatedValue: 0.50 }] },
          { series: [{ calculatedValue: 0.4666 }, { calculatedValue: 0.49 }] }
        ]
      };
    });

    it('gives the max calculatedValue of 0.5', function(){
      scaleMixin.getMax().should.equal(0.5);
    });

    it('gives getMaxForIndex of 0.49', function() {
      scaleMixin.getMaxForIndex(1).should.equal(0.49);
    });

    it('gives upperBound of 0.5', function() {
      scaleMixin.getUpperBound().should.equal(0.5);
    });
  });

  describe('min 10', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: 10 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives the min calculatedValue of 10', function(){
      scaleMixin.getMin().should.equal(10);
    });

    it('gives getMinForIndex of 12', function() {
      scaleMixin.getMinForIndex(1).should.equal(12);
    });

    it('gives lowerBound of 0', function() {
      scaleMixin.getLowerBound().should.equal(0);
    });
  });

  describe('min 0', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: 0 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives the min calculatedValue of 0', function(){
      scaleMixin.getMin().should.equal(0);
    });

    it('gives getMinForIndex of 12', function() {
      scaleMixin.getMinForIndex(1).should.equal(12);
    });

    it('gives lowerBound of 0', function() {
      scaleMixin.getLowerBound().should.equal(0);
    });
  })

  describe('min -0.5', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: -0.5 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives the min calculatedValue of -0.5', function(){
      scaleMixin.getMin().should.equal(-0.5);
    });

    it('gives getMinForIndex of 12', function() {
      scaleMixin.getMinForIndex(1).should.equal(12);
    });

    it('gives lowerBound of -0.5', function() {
      scaleMixin.getLowerBound().should.equal(-0.5);
    });
  });

  describe('min -0.71', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: -0.71 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives the min calculatedValue of -0.71', function(){
      scaleMixin.getMin().should.equal(-0.71);
    });

    it('gives getMinForIndex of 12', function() {
      scaleMixin.getMinForIndex(1).should.equal(12);
    });

    it('gives lowerBound of -0.75', function() {
      scaleMixin.getLowerBound().should.equal(-0.75);
    });
  });

  describe('min -24', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: -24 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives the min calculatedValue of -24', function(){
      scaleMixin.getMin().should.equal(-24);
    });

    it('gives getMinForIndex of 12', function() {
      scaleMixin.getMinForIndex(1).should.equal(12);
    });

    it('gives lowerBound of -25', function() {
      scaleMixin.getLowerBound().should.equal(-25);
    });
  });

  describe('min -999', function() {
    beforeEach(function() {
      scaleMixin.props = {
        minUpperBound: 0,
        collection: [
          { series: [{ calculatedValue: -999 }, { calculatedValue: 22 }] },
          { series: [{ calculatedValue: 12 }, { calculatedValue: 14 }] }
        ]
      };
    });

    it('gives the min calculatedValue of -999', function(){
      scaleMixin.getMin().should.equal(-999);
    });

    it('gives getMinForIndex of 12', function() {
      scaleMixin.getMinForIndex(1).should.equal(12);
    });

    it('gives lowerBound of -1000', function() {
      scaleMixin.getLowerBound().should.equal(-1000);
    });
  });
});
