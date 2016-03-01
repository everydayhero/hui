'use strict'

import React  from 'react'
import moment from 'moment'
var OFFSET = 12;
// top stop dates running off the edge of the svg

export default React.createClass({

  displayName: 'XScale',

  propTypes: {
    collection: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    minScaleLineGap: React.PropTypes.number,
    dateFormat: React.PropTypes.string,
    gutter: React.PropTypes.shape({
      left: React.PropTypes.number.isRequired,
      right: React.PropTypes.number.isRequired
    })
  },

  getDefaultProps: function() {
    return {
      minScaleLineGap: 60,
      dateFormat: 'MMM D'
    }
  },

  getWidth: function() {
    var props = this.props;
    var gutter = props.gutter;

    return props.width - gutter.left - gutter.right - (OFFSET * 2);
  },

  getScaleIncrement: function() {
    var props = this.props;
    var numberOfseriesPoints = props.collection[0].series.length  - 1;
    var gap = this.getWidth() / numberOfseriesPoints;
    var maxScaleLines = this.getWidth() / props.minScaleLineGap;
    var scaleIncrement = 1;

    if (gap < props.minScaleLineGap) {
      scaleIncrement = Math.ceil(numberOfseriesPoints / maxScaleLines);
    }

    return scaleIncrement;
  },

  renderScaleLines: function() {
    if (this.props.collection.length !== 0) {
      var props = this.props;
      var series = props.collection[0].series;
      var scaleLineGap = this.getWidth() / ( series.length - 1 );
      var xPos = 0;
      var paths = [];
      var scaleIncrement = this.getScaleIncrement();

      for (var i = 0; i < series.length; i += scaleIncrement) {
        paths.push(
          <g
            transform={ 'translate(' + (props.gutter.left + OFFSET) + ', 0)' }
            key={ i }>
            <text
              x={ xPos }
              y={ props.height }
              textAnchor="middle"
              className="hui-XScale__label">
                { moment(series[i].date).format(props.dateFormat) }
            </text>
          </g>);

        xPos += (scaleLineGap * scaleIncrement);
      }

      return paths;
    }
  },

  render: function() {
    return (
      <g className="hui-XScale">
        { this.renderScaleLines() }
      </g>
    );
  }
});
