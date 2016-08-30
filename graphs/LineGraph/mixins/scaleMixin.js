'use strict'

import _ from 'lodash'
var flip = _.curry(function(f, x, y) { return f(y, x); });
var pluck = flip(_.map);

export default {
  getMin: function() {
    return _.min(this.getValues());
  },

  getMax: function() {
    return _.max(this.getValues());
  },

  getValues: function() {
    var values = _.flowRight(pluck('calculatedValue'), _.flatten, pluck('series'));
    return values(this.props.collection);
  },

  getValuesForIndex: function(index) {
    return _.map(this.props.collection[index].series, 'calculatedValue');
  },

  getMinForIndex: function(index) {
    return this.props.scaleToLowerBound ? this.getLowerBound() : _.min(this.getValuesForIndex(index));
  },

  getMaxForIndex: function(index) {
    return _.max(this.getValuesForIndex(index));
  },

  getPathHeight: function(index) {
    return this.getMaxForIndex(index) - Math.min(this.getLowerBound(), this.getMinForIndex(index));
  },

  getBoundsHeight: function() {
    return this.getUpperBound() - this.getLowerBound();
  },

  getBound: function(value, bound) {
    var valueToLog = parseFloat(value) !== 0 ? Math.abs(parseFloat(value)) : 1; // log 0 is undefined, resulting in infinity and/or NaN
    var power = Math.floor(Math.log(valueToLog) / Math.LN10);
    var division = Math.pow(10, power) * 0.5;
    var multiplier = value / division;
    return bound(multiplier) * division;
  },

  getLowerBound: function() {
    var lowerBound = this.getBound(this.getMin(), Math.floor);
    return this.props.scaleToLowerBound ? lowerBound : Math.min(0, lowerBound);
  },

  getUpperBound: function() {
    var upperBound = this.getBound(this.getMax(), Math.ceil);
    var minUpperBound = this.props.minUpperBound + this.getLowerBound();
    return Math.max(minUpperBound, upperBound);
  }
};
