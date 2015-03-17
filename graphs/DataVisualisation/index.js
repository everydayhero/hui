"use strict";

var React   = require('react');
var Graph   = require('../LineGraph');
var DeltaArrow = require('../DeltaArrow');
var SingleNumber = require('./SingleNumber');
var Legend = require('./Legend');

module.exports = React.createClass({
  displayName: 'DataVisualisation',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    seriesValueKey: React.PropTypes.string.isRequired,
    valueConverter: React.PropTypes.func,
    stacked: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    legendLabels: React.PropTypes.arrayOf(React.PropTypes.string),
    delta: React.PropTypes.number,
    tipLabel: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      stacked: true,
      valueConverter: function(number) {
        return number;
      },
      loading: false
    };
  },

  renderGraph: function() {
    var props          = this.props,
        series         = props.series,
        seriesValueKey = props.seriesValueKey,
        valueConverter = props.valueConverter,
        stacked        = props.stacked,
        tipLabel       = props.tipLabel,
        loading        = props.loading;

    if (series) {
      return (
        <Graph
          stacked={ stacked }
          series={ series }
          seriesValueKey={ seriesValueKey }
          valueConverter={ valueConverter }
          tipLabel={ tipLabel }
          loading={ loading } />
      );
    }
  },

  renderTotal: function() {
    var props          = this.props,
        total          = props.total,
        title          = props.title,
        valueConverter = props.valueConverter,
        loading        = props.loading;

    if (typeof(total) != 'undefined') {
      return (
        <SingleNumber title={ title } value={ valueConverter(total) } loading={ loading }/>
      );
    }
  },

  renderDeltaArrow: function() {
    var props   = this.props,
        delta   = props.delta,
        loading = props.loading;

    if (delta) {
      return <DeltaArrow delta={ delta } loading={ loading } />;
    }
  },

  renderLegend: function() {
    var props = this.props,
        loading = props.loading,
        legendLabels = props.legendLabels;

    if (loading || !legendLabels) {
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
