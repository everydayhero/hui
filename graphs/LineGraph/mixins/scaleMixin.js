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

  getMaxForIndex: function(index) {
    return _.max(_.pluck(this.props.collection[index].series, 'calculatedValue'));
  },

  getBound: function(value) {
    var power = Math.max(1, Math.floor(Math.log(Math.max(1, Math.abs(value))) / Math.LN10));
    var division = Math.pow(10, power) * 0.5;
    var delta = division - (value % division);
    return value >= 0 ? value + delta : value - delta;
  },

  getLowerBound: function() {
    return Math.min(0, this.getBound(this.getMin()));
  },

  getUpperBound: function() {
    return this.getBound(this.getMax());
  }
};
