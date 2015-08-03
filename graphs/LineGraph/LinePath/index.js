'use strict';

var _           = require('lodash');
var React       = require('react');
var GraphLine  = require('paths-js/stock');
var scaleMixin = require('../mixins/scaleMixin');

function date(series) {
  var d = new Date(series.date);

  return d.getTime();
}

module.exports = React.createClass({
  displayName: 'LinePath',

  mixins: [scaleMixin],

  propTypes: {
    area: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    line: React.PropTypes.bool.isRequired,
    collection: React.PropTypes.array.isRequired,
    collectionValueKey: React.PropTypes.string.isRequired,
    valueConverter: React.PropTypes.func,
    width: React.PropTypes.number.isRequired
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
      data: [props.collection[props.index].series],
      xaccessor: date,
      yaccessor: function(d) { return d.calculatedValue; },
      width: props.width - props.gutter.left - props.gutter.right,
      height: this.getPathHeight(),
      closed: !props.line
    });
  },

  getTranslateY: function() {
    var translationPercentage = 1 - this.getScalePercentage();
    return this.props.gutter.top + (this.getDrawingHeight() * translationPercentage);
  },

  calculateTotal: function(dataPoint) {
    var props          = this.props,
        collectionValueKey = props.collectionValueKey,
        valueConverter = props.valueConverter,
        total          = 0;

    _.forEach(props.collection, function(set) {
      total += valueConverter(set.series[dataPoint][collectionValueKey])
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
        collectionValueKey = props.collectionValueKey,
        valueConverter = props.valueConverter;

    return function() {
      var tipInfo = {
        date: data.date,
        value: valueConverter(data[collectionValueKey]),
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

    _.forEach(graphLine.curves[0].item, function(series, dataPoint) {
      var y = graphLine.yscale(series.calculatedValue) + translateY;
      var x = graphLine.xscale(date(series)) + translateX;
      targets.push(<circle
        cx={ x }
        cy={ y }
        r="6"
        className="hui-LinePath__target"
        onMouseOver={ onMouseOver(series, dataPoint, { x, y }) }
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
        transform={ 'translate(' + this.props.gutter.left + ', ' + this.getTranslateY() + ')' }
        className={ 'hui-LinePath__' + type }
        d={ this.graphLine().curves[0][type].path.print() }/>
    );
  },

  render: function() {
    var givenClassName = this.props.className || '';
    return (
      <g className={ 'hui-LinePath ' + givenClassName }>
        { this.renderPath('area') }
        { this.renderPath('line') }
        { this.renderTipTargets() }
      </g>
    );
  }
});
