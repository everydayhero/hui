/** @jsx React.DOM */
"use strict";
var React      = require('react');
var _          = require('lodash');
var numeral    = require('numeral');
var Path       = require('paths-js/path');
var scaleMixin = require('../mixins/scaleMixin');
var TEXTOFFSET = 8;

module.exports = React.createClass({
  displayName: 'YScale',
  mixins: [scaleMixin],

  propTypes: {
    series: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    minScaleLineGap: React.PropTypes.number,
    gutter: React.PropTypes.shape({
      bottom: React.PropTypes.number.isRequired,
      top: React.PropTypes.number.isRequired
    })
  },

  getDefaultProps: function() {
    return {
      minScaleLineGap: 20
    }
  },

  getHeight: function() {
    var props = this.props;
    var gutter = props.gutter;

    return props.height - gutter.bottom - gutter.top;
  },

  getScaleLines: function() {
    var props = this.props;
    var numberOfScaleLine = Math.floor(this.getHeight() / props.minScaleLineGap);
    var upperBound = this.getUpperBound();
    var delta;

    while(numberOfScaleLine > 0) {
      delta = Math.ceil(upperBound / numberOfScaleLine);

      if(upperBound % numberOfScaleLine === 0) {
        delta = Math.ceil(upperBound / numberOfScaleLine);
        break;
      }
      numberOfScaleLine --;
    }

    return {
      total: numberOfScaleLine,
      delta: delta
    };
  },

  getScaleLineGap: function() {
    return this.getHeight() / (this.getScaleLines().total);
  },

  renderScaleLines: function() {
    var scaleLinePaths = [];
    var scaleLines = this.getScaleLines();
    var yPos = this.getHeight();
    var scaleLineGap = this.getScaleLineGap();
    var count = 0;
    var label = 0;
    var format = '00 a';

    while(scaleLines.total + 1 !== count) {
      var path = Path()
                .moveto({x: 0, y: yPos })
                .hlineto({x: this.props.width});
      format = (label > 1000)? '0.0 a' : format;

      scaleLinePaths.push(
        <g
          key={ count }
          transform={ "translate(0, "+ this.props.gutter.top +")" }>
          <path
            className="YScale__line"
            d={ path.print() } />
          <text
            x="0"
            y={ yPos - TEXTOFFSET }
            className="YScale__label">
              { numeral(label).format(format) }
          </text>
        </g>
      );

      count ++;
      yPos = yPos - scaleLineGap;
      label += scaleLines.delta;
    }

    return scaleLinePaths;
  },

  render: function() {
    return (
      <g className="hui-YScale">
        { this.renderScaleLines() }
      </g>
    );
  }
});
