"use strict";

var React   = require('react');
var Graphs  = require('../LineGraph');
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
    type: React.PropTypes.oneOf(['donations', 'supporters']),
    legendLabels: React.PropTypes.arrayOf(React.PropTypes.string)
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
        <SingleNumber type="donations" title={ title } value={ total }/>
      );
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
      <div className="DataVisalisation">
        { this.renderTotal() }
        { this.renderGraph() }
        { this.renderLegend() }
      </div>
    );
  }
});
