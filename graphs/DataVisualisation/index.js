"use strict";

var React   = require('react');
var Graphs  = require('../LineGraph');
var SingleNumber = require('./SingleNumber');

module.exports = React.createClass({
  displayName: 'DataVisalisation',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    stacked: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(['donations', 'supporters'])
  },

  getDefaultProps: function() {
   return {
     stacked: true
   };
  },

  renderGraph: function() {
    var series = this.props.series;
    if (series) {
      return (
        <Graphs stacked={ this.props.stacked } series={ series } />
      );
    }
  },

  renderTotal: function() {
    var total = this.props.total;
    if (total) {
      return (
        <SingleNumber type="donations" title={ this.props.title } value={ total }/>
      );
    }
  },

  render: function() {
    return (
      <div className="DataVisalisation">
        { this.renderTotal() }
        { this.renderGraph() }
      </div>
    );
  }
});
