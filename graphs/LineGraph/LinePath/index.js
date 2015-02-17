/** @jsx React.DOM */
/** @jsx React.DOM */
"use strict";

var React       = require('react');
var SmoothLine  = require('paths-js/smooth-line');
var scaleMixing = require('../mixins/scaleMixin');

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
    area: React.PropTypes.bool.isRequired
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
      </g>
    );
  }
});