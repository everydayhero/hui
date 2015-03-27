"use strict";

var React       = require('react');
var GraphLine  = require('paths-js/stock');
var scaleMixing = require('../mixins/scaleMixin');
var _           = require('lodash');

function date(data) {
  var d = new Date(data.date);

  return d.getTime();
}

module.exports = React.createClass({
  displayName: 'LinePath',
  mixins: [scaleMixing],

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    series: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    line: React.PropTypes.bool.isRequired,
    area: React.PropTypes.bool.isRequired,
    seriesValueKey: React.PropTypes.string.isRequired,
    valueConverter: React.PropTypes.func
  },

  getDrawingHeight: function() {
    var props = this.props;

    return props.height - props.gutter.bottom  - props.gutter.top;
  },

  getScalePercentage: function() {
    return this.getMaxForIndex(this.props.index) / this.getUpperBound();
  },

  getPathHeight: function() {
    return this.getDrawingHeight() * this.getScalePercentage();
  },

  graphLine: function() {
    var props = this.props;

    return GraphLine({
      data: [props.series[props.index]],
      xaccessor: date,
      yaccessor: function(d) { return d.calculatedValue; },
      width: props.width - props.gutter.left - props.gutter.right,
      height: this.getPathHeight(),
      closed: !props.lined
    });
  },

  getTranslateY: function() {
    var translationPercentage = 1 - this.getScalePercentage();
    return this.props.gutter.top + (this.getDrawingHeight() * translationPercentage);
  },

  calculateTotal: function(dataPoint) {
    var props          = this.props,
        seriesValueKey = props.seriesValueKey,
        valueConverter = props.valueConverter,
        total          = 0;

    _.forEach(props.series, function(data) {
      total += valueConverter(data[dataPoint][seriesValueKey])
    });

    return total;
  },

  calculateOffset: function(pointPos) {
    return this.props.width - pointPos.x;
  },

  isFlipOver: function(pointPos) {
    var isFlipOver = false;

    if (this.calculateOffset(pointPos) < 200) {
      isFlipOver = true;
    }

    return isFlipOver;
  },

  onMouseOver: function(data, dataPoint, pos) {
    var props          = this.props,
        seriesValueKey = props.seriesValueKey,
        valueConverter = props.valueConverter;

    return function() {
      var tipInfo = {
        date: data.date,
        value: valueConverter(data[seriesValueKey]),
        total: this.calculateTotal(dataPoint)
      }

      this.props.onPointOver(tipInfo, pos, this.isFlipOver(pos));
    }.bind(this);
  },

  onMouseOut: function() {
    this.props.onPointLeave();
  },

  renderTipTargets: function() {
    var graphLine = this.graphLine();
    var targets = [];
    var translateX = this.props.gutter.left;
    var translateY = this.getTranslateY();
    var onMouseOver = this.onMouseOver;
    var onMouseOut = this.onMouseOut;

    _.forEach(graphLine.curves[0].item, function(data, dataPoint) {
      var y = graphLine.yscale(data.calculatedValue) + translateY;
      var x = graphLine.xscale(date(data)) + translateX;
      targets.push(<circle
        cx={ x }
        cy={ y }
        r="6"
        className="hui-LinePath__target"
        onMouseOver={ onMouseOver(data, dataPoint, {x: x, y: y}) }
        onMouseOut={ onMouseOut } />
      );
    });

    return targets;
  },

  renderPath: function(type) {
    if (!this.props[type]) {
      return false;
    }

    return (
      <path
        transform={ "translate(" + this.props.gutter.left + ", " + this.getTranslateY()  +")" }
        className={ "hui-LinePath__" + type }
        d={ this.graphLine().curves[0][type].path.print() }/>
    );
  },

  render: function() {
    return (
      <g className="hui-LinePath">
        { this.renderPath('area') }
        { this.renderPath('line') }
        { this.renderTipTargets() }
      </g>
    );
  }
});
