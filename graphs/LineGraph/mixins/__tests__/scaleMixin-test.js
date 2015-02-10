"use strict";
jest.autoMockOff();

var scaleMixin = require('../scaleMixin');

describe('scaleMixin', function() {
  describe('max 24', function() {
    beforeEach(function() {
      scaleMixin.props = {
        series: [[{calculatedValue: 5}, {calculatedValue: 2}],[{calculatedValue: 3}, {calculatedValue: 24}]]
      };
    });

    it('gives the max calculatedValue of 24', function(){
      expect(scaleMixin.getMax()).toBe(24);
    });

    it('gives upperBound of 25', function() {
      expect(scaleMixin.getUpperBound()).toBe(25);
    });

    it('gives getMaxForIndex of 5', function() {
      expect(scaleMixin.getMaxForIndex(0)).toBe(5);
    });
  });

  describe('max 999', function() {
    beforeEach(function() {
      scaleMixin.props = {
        series: [[{calculatedValue: 999}, {calculatedValue: 70}],[{calculatedValue: 566.6}, {calculatedValue: 5}]]
      };
    });

    it('gives the max calculatedValue of 999', function(){
      expect(scaleMixin.getMax()).toBe(999);
    });

    it('gives upperBound of 1000', function() {
      expect(scaleMixin.getUpperBound()).toBe(1000);
    });

    it('gives getMaxForIndex of 566.6', function() {
      expect(scaleMixin.getMaxForIndex(1)).toBe(566.6);
    });
  });

  describe('max 0.7', function() {
    beforeEach(function() {
      scaleMixin.props = {
        series: [[{calculatedValue: 0.123}, {calculatedValue: 0.71}],[{calculatedValue: 0.5666}, {calculatedValue: 0.5}]]
      };
    });

    it('gives the max calculatedValue of 0.71', function(){
      expect(scaleMixin.getMax()).toBe(0.71);
    });

    it('gives upperBound of 0.75', function() {
      expect(scaleMixin.getUpperBound()).toBe(0.75);
    });

    it('gives getMaxForIndex of 0.5666', function() {
      expect(scaleMixin.getMaxForIndex(1)).toBe(0.5666);
    });
  });

  describe('max 0.5', function() {
    beforeEach(function() {
      scaleMixin.props = {
        series: [[{calculatedValue: 0.123}, {calculatedValue: 0.50}],[{calculatedValue: 0.4666}, {calculatedValue: 0.49}]]
      };
    });

    it('gives the max calculatedValue of 0.5', function(){
      expect(scaleMixin.getMax()).toBe(0.5);
    });

    it('gives upperBound of 1', function() {
      expect(scaleMixin.getUpperBound()).toBe(0.5);
    });

    it('gives getMaxForIndex of 0.49', function() {
      expect(scaleMixin.getMaxForIndex(1)).toBe(0.49);
    });
  });
});
