/** @jsx React.DOM */
"use strict";
var _        = require('lodash');
var React    = require('react');
var LinePath = require('./LinePath');
var YScale   = require('./YScale');
var XScale   = require('./XScale');

module.exports = React.createClass({
  displayName: 'LineGraph',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    seriesValueKey: React.PropTypes.string,
    stacked: React.PropTypes.bool,
    lined: React.PropTypes.bool,
    gutter: React.PropTypes.shape({
      left: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      top: React.PropTypes.number
    })
  },

  getDefaultProps: function() {
    return {
      seriesValueKey: 'value',
      gutter: {
        left: 35,
        right: 20,
        bottom: 20,
        top: 20
      },
      stacked: false,
      line: false,
      area: true
    }
  },

  transformSeries: function() {
    var props    = this.props,
        series   = _.clone(props.series, true),
        seriesValueKey = props.seriesValueKey;

    return _.map(series, function(dataSeries, seriesIndex) {
      return _.map(dataSeries, function(dataPoint, pointIndex) {
        var value = dataPoint[seriesValueKey];
        if (props.stacked && seriesIndex !== 0) {
          dataPoint.calculatedValue = value + series[seriesIndex - 1][pointIndex].calculatedValue;
        } else {
          dataPoint.calculatedValue = value;
        }

        return dataPoint;
      });
    });
  },

  handleResize: function() {
    var domNode = this.getDOMNode();
    this.setState({
      height: domNode.offsetHeight,
      width: domNode.offsetWidth
    });
  },

  componentDidMount: function() {
    this.handleResizeDebounce = _.debounce(this.handleResize, 300, {maxWait: 1000});
    window.addEventListener('resize', this.handleResizeDebounce);
    this.handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResizeDebounce);
  },

  componentWillMount: function() {
    this.setState({series: this.transformSeries()});
  },

  componentWillReceiveProps: function() {
    this.setState({series: this.transformSeries()});
  },

  renderLinePath: function() {
    var paths = [];
    var state = this.state;
    var series = state.series;

    for (var i = series.length - 1; i >= 0; i--) {
      paths.push(
        <LinePath {...this.props} series={ series } index={ i } width={ state.width } height={ state.height } key={ i } />
      );
    };

    return paths;
  },

  renderGraph: function() {
    var state = this.state;
    if (!state.series || !state.width) {
      return false;
    }

    return (
      <g>
        { this.renderLinePath() }
        <YScale {...this.props} series={ state.series } height={ state.height } width={ state.width } />
        <XScale {...this.props} series={ state.series } height={ state.height } width={ state.width } />
      </g>
    );
  },

  render: function() {
    return (
      <div className="hui-LineGraph">
        <svg className="hui-LineGraph__svg">
          { this.renderGraph() }
        </svg>
      </div>);
  }
});
