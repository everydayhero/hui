 var _ = require('lodash');

 module.exports = {
  getMax: function() {
    return _.max(_.map(this.props.collection, function(set) {
      return  _.max(_.pluck(set.series, 'calculatedValue'));
    }));
  },

  getMaxForIndex: function(index) {
    return  _.max(_.pluck(this.props.collection[index].series, 'calculatedValue'));
  },

  getUpperBound: function() {
    var maxValue = this.getMax();
    var power = Math.floor( Math.log(maxValue) / Math.LN10 );
    var division = Math.pow(10, power) * 0.5;

    return (Math.ceil(maxValue / division)) * division;
  }
};
