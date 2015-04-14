"use strict";

var React   = require('react');
var Graph   = require('../LineGraph');
var DeltaArrow = require('../DeltaArrow');
var SingleNumber = require('./SingleNumber');
var Legend = require('./Legend');

module.exports = React.createClass({
  displayName: 'DataVisualisation',

  propTypes: {
    collection: React.PropTypes.array,
    collectionValueKey: React.PropTypes.string,
    valueConverter: React.PropTypes.func,
    stacked: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number,
    totalFormat: React.PropTypes.string,
    legendKeys: React.PropTypes.arrayOf(React.PropTypes.string),
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
    var props = this.props;

    if (props.collection) {
      return (
        <Graph
          stacked={ props.stacked }
          collection={ props.collection }
          collectionValueKey={ props.collectionValueKey }
          valueConverter={ props.valueConverter }
          totalFormat={ props.totalFormat }
          tipLabel={ props.tipLabel }
          loading={ props.loading } />
      );
    }
  },

  renderTotal: function() {
    var props          = this.props,
        total          = props.total,
        totalFormat    = props.totalFormat,
        title          = props.title,
        valueConverter = props.valueConverter,
        loading        = props.loading;

    if (loading || typeof(total) != 'undefined') {
      return (
        <SingleNumber title={ title } format={ totalFormat } value={ valueConverter(total) } loading={ loading }/>
      );
    }
  },

  renderDeltaArrow: function() {
    var props   = this.props,
        delta   = props.delta,
        loading = props.loading;

    if (loading || delta) {
      return <DeltaArrow delta={ delta } loading={ loading } />;
    }
  },

  renderLegend: function() {
    var props = this.props,
        loading = props.loading,
        legendKeys = props.legendKeys;

    if (loading || !legendKeys) {
      return false;
    }

    return (
      <Legend keys={ legendKeys } />
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
