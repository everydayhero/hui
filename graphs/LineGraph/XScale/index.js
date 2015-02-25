'use strict'

var React  = require('react');
var moment = require('moment');
var OFFSET = 12;
// top stop dates running off the edge of the svg

module.exports = React.createClass({

  displayName: 'XScale',

  propTypes: {
    series: React.PropTypes.array.isRequired,
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
    var numberOfDataPoints = props.series[0].length  - 1;
    var gap = this.getWidth() / numberOfDataPoints;
    var maxScaleLines = this.getWidth() / props.minScaleLineGap;
    var scaleIncrement = 1;

    if (gap < props.minScaleLineGap) {
      scaleIncrement = Math.ceil(numberOfDataPoints / maxScaleLines);
    }

    return scaleIncrement;
  },

  renderScaleLines: function() {
    var props = this.props;
    var dataArray = props.series[0];
    var scaleLineGap = this.getWidth() / ( dataArray.length - 1 );
    var xPos = 0;
    var paths = [];
    var scaleIncrement = this.getScaleIncrement();

    for (var i = 0; i < dataArray.length; i += scaleIncrement) {
      paths.push(
        <g
          transform={ "translate("+ (props.gutter.left + OFFSET) + ", 0)" }
          key={ i }>
          <text
            x={ xPos }
            y={ props.height }
            textAnchor="middle"
            className="XScale__label">
              { moment(dataArray[i].date).format(props.dateFormat) }
          </text>
        </g>);

      xPos += (scaleLineGap * scaleIncrement);
    };

    return paths;
  },

  render: function() {
    return (
      <g className="XScale">
        { this.renderScaleLines() }
      </g>
    );
  }
});
