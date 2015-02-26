/** @jsx React.DOM */
"use strict";
var _        = require('lodash');
var React    = require('react');
var LinePath = require('./LinePath');
var YScale   = require('./YScale');
var XScale   = require('./XScale');
var ToolTip  = require('./ToolTip');

module.exports = React.createClass({
  displayName: 'LineGraph',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    seriesValueKey: React.PropTypes.string,
    stacked: React.PropTypes.bool,
    lined: React.PropTypes.bool,
    tipLabel: React.PropTypes.string,
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
        left: 40,
        right: 0,
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

  showTip: function(data, position, isFlipOver) {
    this.setState({
      showTip: true,
      tipPosition: position,
      tipData: data,
      isFlipOver: isFlipOver
    });
  },

  hideTip: function() {
    this.setState({
      showTip: false
    });
  },

  renderLinePath: function() {
    var paths = [];
    var state = this.state;
    var series = state.series;

    for (var i = series.length - 1; i >= 0; i--) {
      paths.push(
        <LinePath
          {...this.props}
          series={ series }
          index={ i }
          width={ state.width }
          height={ state.height }
          key={ i }
          onPointOver={ this.showTip }
          onPointLeave={ this.hideTip }
          seriesValueKey={ this.props.seriesValueKey } />
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
    var state = this.state;
    var props = this.props;

    return (
      <div className="hui-LineGraph">
        <ToolTip
          data={ state.tipData }
          show={ state.showTip }
          position={ state.tipPosition }
          label={ props.tipLabel }
          isFlipOver={ state.isFlipOver } />
        <svg className="hui-LineGraph__svg">
          { this.renderGraph() }
        </svg>
      </div>);
  }
});
