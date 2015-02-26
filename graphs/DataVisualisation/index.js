"use strict";

var React   = require('react');
var Graphs  = require('../LineGraph');
var DeltaArrow = require('../DeltaArrow');
var SingleNumber = require('./SingleNumber');
var Legend = require('./Legend');

module.exports = React.createClass({
  displayName: 'DataVisalisation',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    seriesValueKey: React.PropTypes.string,
    stacked: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    legendLabels: React.PropTypes.arrayOf(React.PropTypes.string),
    delta: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      stacked: true,
      seriesValueKey: 'value'
    };
  },

  renderGraph: function() {
    var props = this.props,
        series = props.series,
        seriesValueKey = props.seriesValueKey,
        stacked = props.stacked;

    if (series) {
      return (
        <Graphs stacked={ stacked } series={ series } seriesValueKey={ seriesValueKey } />
      );
    }
  },

  renderTotal: function() {
    var props = this.props,
        total = props.total,
        title = props.title;

    if (total) {
      return (
        <SingleNumber title={ title } value={ total }/>
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
      <div className="hui-DataVisalisation">
        <h2 className="hui-DataVisalisation__title">{ this.props.title }</h2>
        <div className="hui-DataVisalisation__valueGroup">
          { this.renderTotal() }
          { this.renderDeltaArrow() }
        </div>
        { this.renderGraph() }
        { this.renderLegend() }
      </div>
    );
  }
});
