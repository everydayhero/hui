"use strict";

var React   = require('react');
var Graphs  = require('../LineGraph');
var DeltaArrow = require('../DeltaArrow');
var SingleNumber = require('./SingleNumber');
var Legend = require('./Legend');

module.exports = React.createClass({
  displayName: 'DataVisualisation',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    yAccessor: React.PropTypes.func,
    stacked: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    totalConverter: React.PropTypes.func,
    legendLabels: React.PropTypes.arrayOf(React.PropTypes.string),
    delta: React.PropTypes.number,
    tipLabel: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      stacked: true
    };
  },

  renderGraph: function() {
    var props = this.props,
        series = props.series,
        yAccessor = props.yAccessor,
        stacked = props.stacked,
        tipLabel = props.tipLabel;

    if (series) {
      return (
        <Graphs stacked={ stacked } series={ series } yAccessor={ yAccessor } tipLabel={ tipLabel } />
      );
    }
  },

  renderTotal: function() {
    var props     = this.props,
        total     = props.total,
        converter = props.totalConverter,
        title     = props.title;

    if (total) {
      return (
        <SingleNumber title={ title } value={ converter(total) }/>
      );
    }
  },

  renderDeltaArrow: function() {
    var delta = this.props.delta;

    if (delta) {
      return <DeltaArrow delta={ delta } />;
    }
  },

  renderLegend: function() {
    var props = this.props,
        legendLabels = props.legendLabels;

    if (!legendLabels) {
      return false;
    }

    return (
      <Legend labels={ legendLabels } />
    );
  },

  render: function() {
    return (
      <div className="hui-DataVisualisation">
        <h2 className="hui-DataVisualisation__title">{ this.props.title }</h2>
        <div className="hui-DataVisualisation__valueGroup">
          { this.renderTotal() }
          { this.renderDeltaArrow() }
        </div>
        { this.renderGraph() }
        { this.renderLegend() }
      </div>
    );
  }
});
