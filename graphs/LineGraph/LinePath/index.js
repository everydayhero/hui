'use strict'

import _ from 'lodash'
import React from 'react'
import GraphLine from 'paths-js/stock'
import scaleMixin from '../mixins/scaleMixin'

function date (series) {
  const d = new Date(series.date)

  return d.getTime()
}

export default React.createClass({
  displayName: 'LinePath',

  mixins: [scaleMixin],

  propTypes: {
    area: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    line: React.PropTypes.bool.isRequired,
    collection: React.PropTypes.array.isRequired,
    collectionValueKey: React.PropTypes.string.isRequired,
    valueConverter: React.PropTypes.func,
    width: React.PropTypes.number.isRequired,
    minUpperBound: React.PropTypes.number,
    scaleToLowerBound: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      minUpperBound: 0,
      scaleToLowerBound: false
    }
  },

  getScalePercentage: function () {
    return this.getPathHeight(this.props.index) / this.getBoundsHeight()
  },

  getDrawingHeight: function () {
    const props = this.props
    return props.height - props.gutter.bottom - props.gutter.top
  },

  getPathDrawingHeight: function () {
    return this.getDrawingHeight() * this.getScalePercentage()
  },

  capPoint: function (series, getPoint) {
    const lowerBound = this.getLowerBound()
    const point = getPoint(series)
    return { value: lowerBound, calculatedValue: lowerBound, date: point.date }
  },

  cappedSeries: function (series) {
    return [this.capPoint(series, _.first)].concat(series, [this.capPoint(series, _.last)])
  },

  graphLine: function () {
    const props = this.props

    return GraphLine({
      data: [this.cappedSeries(props.collection[props.index].series)],
      xaccessor: date,
      yaccessor: function (d) { return d.calculatedValue },
      width: props.width - props.gutter.left - props.gutter.right,
      height: this.getPathDrawingHeight(),
      closed: !props.line && !props.scaleToLowerBound
    })
  },

  getTranslateY: function () {
    const translationPercentage = (this.getUpperBound() - this.getMaxForIndex(this.props.index)) / this.getBoundsHeight()
    return this.props.gutter.top + this.getDrawingHeight() * translationPercentage
  },

  calculateTotal: function (dataPoint) {
    const props = this.props
    const collectionValueKey = props.collectionValueKey
    const valueConverter = props.valueConverter

    return props.collection.reduce(function (total, set) {
      return total + valueConverter(set.series[dataPoint][collectionValueKey])
    }, 0)
  },

  calculateOffset: function (pointPos) {
    return this.props.width - pointPos.x
  },

  isFlipOver: function (pointPos) {
    return this.calculateOffset(pointPos) < 200
  },

  onMouseOver: function (data, dataPoint, pos) {
    const props = this.props
    const collectionValueKey = props.collectionValueKey
    const valueConverter = props.valueConverter

    return function () {
      const tipInfo = {
        date: data.date,
        value: valueConverter(data[collectionValueKey]),
        total: this.calculateTotal(dataPoint)
      }

      this.props.onPointOver(tipInfo, pos, this.isFlipOver(pos))
    }.bind(this)
  },

  onMouseOut: function () {
    this.props.onPointLeave()
  },

  renderTipTargets: function () {
    const graphLine = this.graphLine()
    const translateX = this.props.gutter.left
    const translateY = this.getTranslateY()
    const onMouseOver = this.onMouseOver
    const onMouseOut = this.onMouseOut

    return graphLine.curves[0].item.map((series, index) => {
      const y = graphLine.yscale(series.calculatedValue) + translateY
      const x = graphLine.xscale(date(series)) + translateX
      return (
        <circle
          key={index}
          cx={x}
          cy={y}
          r='6'
          className='hui-LinePath__target'
          onMouseOver={onMouseOver(series, index, { x, y })}
          onMouseOut={onMouseOut} />
      )
    })
  },

  renderPath: function (type) {
    if (!this.props[type]) {
      return false
    }

    return (
      <path
        transform={'translate(' + this.props.gutter.left + ', ' + this.getTranslateY() + ')'}
        className={'hui-LinePath__' + type}
        d={this.graphLine().curves[0][type].path.print()} />
    )
  },

  render: function () {
    const givenClassName = this.props.className || ''
    return (
      <g className={'hui-LinePath ' + givenClassName}>
        { this.renderPath('area') }
        { this.renderPath('line') }
        { this.renderTipTargets() }
      </g>
    )
  }
})
