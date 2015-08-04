'use strict';

var scaleMixin = require('../scaleMixin');

describe('scaleMixin', function() {
  describe('max 24', function() {
    beforeEach(function() {
      scaleMixin.props = {
        collection:
        [
          { series:
            [
              { calculatedValue: -23 },
              { calculatedValue: 2 }
            ]
          },
          { series: [
              { calculatedValue: 3 },
              { calculatedValue: 24 }
            ]
          }
        ]
      };
    });

    it('gives the max calculatedValue of 24', function(){
      scaleMixin.getMax().should.equal(24);
    });

    it('gives upperBound of 25', function() {
      scaleMixin.getUpperBound().should.equal(25);
    });

    it('gives lowerBound of -25', function() {
      scaleMixin.getLowerBound().should.equal(-25);
    });

    it('gives getMaxForIndex of 5', function() {
      scaleMixin.getMaxForIndex(0).should.equal(5);
    });
  });

  describe('max 999', function() {
    beforeEach(function() {
      scaleMixin.props = {
        collection: [
          {
            series: [
              { calculatedValue: 999 },
              { calculatedValue: 70 }
            ]
          },
          {
            series: [
              { calculatedValue: 566.6 },
              { calculatedValue: 5 }
            ]
          }
        ]
      };
    });

    it('gives the max calculatedValue of 999', function(){
      scaleMixin.getMax().should.equal(999);
    });

    it('gives upperBound of 1000', function() {
      scaleMixin.getUpperBound().should.equal(1000);
    });

    it('gives getMaxForIndex of 566.6', function() {
      scaleMixin.getMaxForIndex(1).should.equal(566.6);
    });
  });

  describe('max 0.7', function() {
    beforeEach(function() {
      scaleMixin.props = {
        collection: [
          {
            series: [
              { calculatedValue: 0.123 },
              { calculatedValue: 0.71 }
            ]
          },
          {
            series: [
              { calculatedValue: 0.5666 },
              { calculatedValue: 0.5 }
            ]
          }
        ]
      };
    });

    it('gives the max calculatedValue of 0.71', function(){
      scaleMixin.getMax().should.equal(0.71);
    });

    it('gives upperBound of 0.75', function() {
      scaleMixin.getUpperBound().should.equal(0.75);
    });

    it('gives getMaxForIndex of 0.5666', function() {
      scaleMixin.getMaxForIndex(1).should.equal(0.5666);
    });
  });

  describe('max 0.5', function() {
    beforeEach(function() {
      scaleMixin.props = {
        collection: [
          {
            series: [
              { calculatedValue: 0.123 },
              { calculatedValue: 0.50 }
            ]
          },
          {
            series: [
              { calculatedValue: 0.4666 },
              { calculatedValue: 0.49 }
            ]
          }
        ]
      };
    });

    it('gives the max calculatedValue of 0.5', function(){
      scaleMixin.getMax().should.equal(0.5);
    });

    it('gives upperBound of 1', function() {
      scaleMixin.getUpperBound().should.equal(0.5);
    });

    it('gives getMaxForIndex of 0.49', function() {
      scaleMixin.getMaxForIndex(1).should.equal(0.49);
    });
  });
});
