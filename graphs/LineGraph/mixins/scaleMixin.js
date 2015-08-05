'use strict';

var _ = require('lodash');
var flip = _.curry(function(f, x, y) { return f(y, x); });
var pluck = flip(_.pluck);

module.exports = {
  getMin: function() {
    return _.min(this.getValues());
  },

  getMax: function() {
    return _.max(this.getValues());
  },

  getValues: function() {
    var values = _.compose(pluck('calculatedValue'), _.flatten, pluck('series'));
    return values(this.props.collection);
  },

  getValuesForIndex: function(index) {
    return _.pluck(this.props.collection[index].series, 'calculatedValue');
  },

  getMinForIndex: function(index) {
    return _.min(this.getValuesForIndex(index));
  },

  getMaxForIndex: function(index) {
    return _.max(this.getValuesForIndex(index));
  },

  getBound: function(value) {
    var valueToLog = parseFloat(value) !== 0 ? Math.abs(parseFloat(value)) : 1; // log 0 is undefined, resulting in infinity and/or NaN
    var power = Math.floor(Math.log(valueToLog) / Math.LN10);
    var division = Math.pow(10, power) * 0.5;
    var multiplier = value / division;
    return value >= 0 ? Math.ceil(multiplier) * division : Math.floor(multiplier) * division;
  },

  getLowerBound: function() {
    var lowerBound = this.getBound(this.getMin());
    return Math.min(0, lowerBound);
  },

  getUpperBound: function() {
    return this.getBound(this.getMax());
  }
};
