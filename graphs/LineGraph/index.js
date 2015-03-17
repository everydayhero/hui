"use strict";

var _                  = require('lodash');
var React              = require('react');
var LinePath           = require('./LinePath');
var YScale             = require('./YScale');
var XScale             = require('./XScale');
var ToolTip            = require('./ToolTip');
var LoadingPlaceholder = require('./LoadingPlaceholder');

module.exports = React.createClass({
  displayName: 'LineGraph',

  propTypes: {
    series: React.PropTypes.array.isRequired,
    seriesValueKey: React.PropTypes.string.isRequired,
    valueConverter: React.PropTypes.func,
    stacked: React.PropTypes.bool,
    lined: React.PropTypes.bool,
    tipLabel: React.PropTypes.string,
    gutter: React.PropTypes.shape({
      left: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      top: React.PropTypes.number
    }),
    loading: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      gutter: {
        left: 40,
        right: 0,
        bottom: 20,
        top: 20
      },
      stacked: false,
      line: false,
      area: true,
      valueConverter: function(number) {
        return number;
      },
      loading: false
    }
  },

  transformSeries: function() {
    var props          = this.props,
        seriesValueKey = props.seriesValueKey,
        valueConverter = props.valueConverter,
        series         = _.clone(props.series, true);

    return _.map(series, function(dataSeries, seriesIndex) {
      return _.map(dataSeries, function(dataPoint, pointIndex) {
        var value = valueConverter(dataPoint[seriesValueKey]);

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
    var paths  = [];
    var state  = this.state;
    var props  = this.props;
    var series = state.series;

    for (var i = series.length - 1; i >= 0; i--) {
      paths.push(
        <LinePath
          {...props}
          series={ series }
          index={ i }
          width={ state.width }
          height={ state.height }
          key={ i }
          onPointOver={ this.showTip }
          onPointLeave={ this.hideTip }
          seriesValueKey={ props.seriesValueKey }
          valueConverter={ props.valueConverter } />
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
    var state   = this.state,
        props   = this.props,
        loading = props.loading,
        tooltip,
        graph;

    if (loading === true) {
      graph = (
        <LoadingPlaceholder
          height={ state.height }
          width={ state.width } />
      );
    } else {
      tooltip = (
        <ToolTip
          data={ state.tipData }
          show={ state.showTip }
          position={ state.tipPosition }
          label={ props.tipLabel }
          isFlipOver={ state.isFlipOver } />
      );
      graph = this.renderGraph();
    }

    return (
      <div className="hui-LineGraph">
        { tooltip }
        <svg className="hui-LineGraph__svg">
          { graph }
        </svg>
      </div>
    );
  }
});
