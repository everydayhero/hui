'use strict';

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
    collection: React.PropTypes.array.isRequired,
    collectionValueKey: React.PropTypes.string.isRequired,
    valueConverter: React.PropTypes.func,
    totalFormat: React.PropTypes.string,
    stacked: React.PropTypes.bool,
    line: React.PropTypes.bool,
    area: React.PropTypes.bool,
    tipLabel: React.PropTypes.string,
    gutter: React.PropTypes.shape({
      left: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      top: React.PropTypes.number
    }),
    loading: React.PropTypes.bool,
    emptyState: React.PropTypes.bool
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
      loading: false,
      emptyState: false
    }
  },

  componentWillMount: function() {
    this.setState({ collection: this.transformCollection() });
  },

  componentDidMount: function() {
    this.handleResizeDebounce = _.debounce(this.handleResize, 300, { maxWait: 1000 });
    window.addEventListener('resize', this.handleResizeDebounce);
    this.handleResize();
  },

  componentWillReceiveProps: function() {
    this.setState({ collection: this.transformCollection() });
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResizeDebounce);
  },

  transformCollection: function() {
    var props              = this.props,
        collectionValueKey = props.collectionValueKey,
        valueConverter     = props.valueConverter,
        collection         = _.clone(props.collection, true);

    return _.map(collection, function(set, collectionIndex) {
      var series = _.map(set.series, function(dataPoint, pointIndex) {
        var value = valueConverter(dataPoint[collectionValueKey]);

        if (props.stacked && collectionIndex !== 0) {
          dataPoint.calculatedValue = value + collection[collectionIndex - 1].series[pointIndex].calculatedValue;
        } else {
          dataPoint.calculatedValue = value;
        }

        return dataPoint;
      });

      set.series = series;

      return set;
    });
  },

  handleResize: function() {
    var domNode = this.getDOMNode();
    this.setState({
      height: domNode.offsetHeight,
      width: domNode.offsetWidth
    });
  },

  showTip: function(data, position, isFlipOver) {
    this.setState({
      showTip: true,
      tipPosition: position,
      tipData: data,
      isFlipOver
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
    var collection = state.collection;

    for (var i = collection.length - 1; i >= 0; i--) {
      paths.push(
        <LinePath
          {...props}
          collection={ collection }
          className={ collection[i].className }
          index={ i }
          width={ state.width }
          height={ state.height }
          key={ i }
          onPointOver={ this.showTip }
          onPointLeave={ this.hideTip }
          collectionValueKey={ props.collectionValueKey }
          valueConverter={ props.valueConverter } />
      );
    }

    return paths;
  },

  renderGraph: function() {
    var state = this.state;
    if (!state.collection || !state.width) {
      return false;
    }

    return (
      <g>
        { this.renderLinePath() }
        <YScale {...this.props} collection={ state.collection } height={ state.height } width={ state.width } />
        <XScale {...this.props} collection={ state.collection } height={ state.height } width={ state.width } />
      </g>
    );
  },

  render: function() {
    var state      = this.state,
        props      = this.props,
        loading    = props.loading,
        emptyState = props.emptyState,
        emptyData,
        tooltip,
        graph;

    if ((loading === true || emptyState === true) && state.width) {
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
          totalFormat={ props.totalFormat }
          isFlipOver={ state.isFlipOver } />
      );
      graph = this.renderGraph();
    }

    if(emptyState === true) {
      emptyData =  (
      <span className="hui-LineGraph__emptyState">
        No Information to Display
      </span>);
    }

    return (
      <div className="hui-LineGraph">
        { emptyData }
        { tooltip }
        <svg className="hui-LineGraph__svg">
          { graph }
        </svg>
      </div>
    );
  }
});
