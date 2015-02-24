/** @jsx React.DOM */
/** @jsx React.DOM */
"use strict";

var React       = require('react');
var SmoothLine  = require('paths-js/smooth-line');
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
  },

  getInitialState: function() {
    return {
      showTip: false
    }
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

  smoothLine: function() {
    var props = this.props;

    return SmoothLine({
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
    var props = this.props;
    var total = 0;

    _.forEach(props.series, function(data) {
      total += data[dataPoint][props.seriesValueKey];
    });

    return total;
  },

  onMouseOver: function(data, dataPoint, pos) {
    return function() {
      var tipInfo = {
        date: data.date,
        value: data[this.props.seriesValueKey],
        total: this.calculateTotal(dataPoint)
      }

      this.props.onPointOver(tipInfo, pos);
    }.bind(this);
  },

  onMouseLeave: function() {
    this.props.onPointLeave();
  },

  renderTipTargets: function() {
    var smoothLine = this.smoothLine();
    var targets = [];
    var translateX = this.props.gutter.left;
    var translateY = this.getTranslateY();
    var onMouseOver = this.onMouseOver;
    var onMouseLeave = this.onMouseLeave;

    _.forEach(smoothLine.curves[0].item, function(data, dataPoint) {
      var y = smoothLine.yscale(data.calculatedValue) + translateY;
      var x = smoothLine.xscale(date(data)) + translateX;
      targets.push(<circle
        cx={ x }
        cy={ y }
        r="3"
        fill="red"
        onMouseOver={ onMouseOver(data, dataPoint, {x: x, y: y}) }
        onMouseLeave={ onMouseLeave } />
      );
    });

    return targets;
  },

  renderTip: function() {
    var state = this.state;

    if (!state.showTip) {
      return null;
    }

    return (
      <g
        className="LinePath__tip"
        transform={ "translate(" + state.tipPos.x + ", " + state.tipPos.y  + ")" } >
          <circle r="10" fill="blue"/>
      </g>
    );
  },

  renderPath: function(type) {
    if (!this.props[type]) {
      return false;
    }

    return (
      <path
        transform={ "translate(" + this.props.gutter.left + ", " + this.getTranslateY()  +")" }
        className={ "LinePath__" + type }
        d={ this.smoothLine().curves[0][type].path.print() }/>
    );
  },

  render: function() {
    return (
      <g className="LinePath">
        { this.renderPath('area') }
        { this.renderPath('line') }
        { this.renderTip() }
        { this.renderTipTargets() }
      </g>
    );
  }
});
