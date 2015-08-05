'use strict';

var React      = require('react');
var numeral    = require('numeral');
var Path       = require('paths-js/path');
var scaleMixin = require('../mixins/scaleMixin');
var TEXTOFFSET = 8;

module.exports = React.createClass({
  displayName: 'YScale',

  mixins: [scaleMixin],

  propTypes: {
    collection: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    minScaleLineGap: React.PropTypes.number,
    width: React.PropTypes.number.isRequired,
    gutter: React.PropTypes.shape({
      bottom: React.PropTypes.number.isRequired,
      top: React.PropTypes.number.isRequired
    }),
    zeroLowerBound: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      minScaleLineGap: 20,
      zeroLowerBound: true
    };
  },

  getHeight: function() {
    var props = this.props;
    var gutter = props.gutter;

    return props.height - gutter.bottom - gutter.top;
  },

  getScaleLines: function() {
    var numberOfScaleLines = Math.floor(this.getHeight() / this.props.minScaleLineGap);
    var distance = this.getUpperBound() - this.getLowerBound();
    while(distance % numberOfScaleLines > 1) { --numberOfScaleLines; }

    return {
      total: numberOfScaleLines,
      delta: Math.ceil(distance / numberOfScaleLines)
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
    var label = this.getLowerBound();
    var format = '00 a';

    while(scaleLines.total + 1 !== count) {
      var path = Path()
                .moveto({ x: 0, y: yPos })
                .hlineto({ x: this.props.width });
      format = (label > 1000) ? '0.0 a' : format;

      scaleLinePaths.push(
        <g
          key={ count }
          transform={ 'translate(0, ' + this.props.gutter.top + ')' }>
          <path
            className="hui-YScale__line"
            d={ path.print() } />
          <text
            x="0"
            y={ yPos - TEXTOFFSET }
            className="hui-YScale__label">
              { numeral(label).format(format) }
          </text>
        </g>
      );

      count++;
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
