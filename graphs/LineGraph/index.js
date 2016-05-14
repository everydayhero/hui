'use strict'

import _                   from 'lodash'
import React               from 'react'
import LinePath            from './LinePath'
import YScale              from './YScale'
import XScale              from './XScale'
import ToolTip             from './ToolTip'
import LoadingPlaceholder  from './LoadingPlaceholder'
import { addListeners, removeListeners } from '../../lib/bindEvents'

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
    showTipDate: React.PropTypes.bool,
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
      showTipDate: true,
      valueConverter: _.identity,
      loading: false,
      emptyState: false
    }
  },

  componentWillMount: function() {
    this.setState({ collection: this.transformCollection() })
  },

  componentDidMount: function() {
    this.handleResizeDebounce = _.debounce(this.handleResize, 300, { maxWait: 1000 })
    addListeners('resize', this.handleResizeDebounce, window)
    this.handleResize()
  },

  componentWillReceiveProps: function() {
    this.setState({ collection: this.transformCollection() })
  },

  componentWillUnmount: function() {
    removeListeners('resize', this.handleResizeDebounce, window)
  },

  transformCollection: function() {
    const props              = this.props
    const collectionValueKey = props.collectionValueKey
    const valueConverter     = props.valueConverter
    const collection         = _.clone(props.collection, true)

    return _.map(collection, function(set, collectionIndex) {
      const series = _.map(set.series, function(dataPoint, pointIndex) {
        const value = valueConverter(dataPoint[collectionValueKey])

        if (props.stacked && collectionIndex !== 0) {
          dataPoint.calculatedValue = value + collection[collectionIndex - 1].series[pointIndex].calculatedValue
        } else {
          dataPoint.calculatedValue = value
        }

        return dataPoint
      })

      set.series = series

      return set
    })
  },

  handleResize: function() {
    const domNode = this.getDOMNode()
    this.setState({
      height: domNode.offsetHeight,
      width: domNode.offsetWidth
    })
  },

  showTip: function(data, position, isFlipOver) {
    this.setState({
      showTip: true,
      tipPosition: position,
      tipData: data,
      isFlipOver
    })
  },

  hideTip: function() {
    this.setState({
      showTip: false
    })
  },

  renderLinePath: function() {
    const paths  = []
    const state  = this.state
    const props  = this.props
    const collection = state.collection

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
      )
    }

    return paths
  },

  renderGraph: function() {
    const state = this.state
    if (!state.collection || !state.width) {
      return false
    }

    return (
      <g>
        { this.renderLinePath() }
        <YScale {...this.props} collection={ state.collection } height={ state.height } width={ state.width } />
        <XScale {...this.props} collection={ state.collection } height={ state.height } width={ state.width } />
      </g>
    )
  },

  render: function() {
    const state      = this.state
    const props      = this.props
    const loading    = props.loading
    const emptyState = props.emptyState
    var emptyData
    var tooltip
    var graph

    if ((loading === true || emptyState === true) && state.width) {
      graph = (
        <LoadingPlaceholder
          height={ state.height }
          width={ state.width } />
      )
    } else {
      tooltip = (
        <ToolTip
          data={ state.tipData }
          show={ state.showTip }
          position={ state.tipPosition }
          label={ props.tipLabel }
          totalFormat={ props.totalFormat }
          isFlipOver={ state.isFlipOver }
          showDate={ props.showTipDate }
          showTotal={ state.collection.length > 1 }
          scaleUnit={ props.scaleUnit } />
      )
      graph = this.renderGraph()
    }

    if(emptyState === true) {
      emptyData =  (
      <span className="hui-LineGraph__emptyState">
        No Information to Display
      </span>)
    }

    return (
      <div className="hui-LineGraph">
        { emptyData }
        { tooltip }
        <svg className="hui-LineGraph__svg">
          { graph }
        </svg>
      </div>
    )
  }
})
