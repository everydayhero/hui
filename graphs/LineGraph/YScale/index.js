'use strict'

import React      from 'react'
import numeral    from 'numeral'
import Path       from 'paths-js/path'
import scaleMixin from '../mixins/scaleMixin'
var TEXTOFFSET = 8;

export default React.createClass({
  displayName: 'YScale',

  mixins: [scaleMixin],

  propTypes: {
    collection: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    minScaleLineGap: React.PropTypes.number,
    minUpperBound: React.PropTypes.number,
    scaleToLowerBound: React.PropTypes.bool,
    scaleUnit: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    gutter: React.PropTypes.shape({
      bottom: React.PropTypes.number.isRequired,
      top: React.PropTypes.number.isRequired
    })
  },

  getDefaultProps: function() {
    return {
      minScaleLineGap: 20,
      minUpperBound: 0,
      scaleToLowerBound: false,
      scaleUnit: ''
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
    while(numberOfScaleLines > 0 && distance % numberOfScaleLines !== 0) { --numberOfScaleLines; }

    return {
      total: numberOfScaleLines,
      delta: Math.ceil(distance / numberOfScaleLines)
    };
  },

  getScaleLineGap: function() {
    return this.getHeight() / (this.getScaleLines().total);
  },

  formatLabel: function(value) {
    var format = (value > 1000) ? '0.0 a' : '00 a';
    var label = numeral(value).format(format);
    return label + this.props.scaleUnit;
  },

  renderScaleLines: function() {
    var scaleLinePaths = [];
    var scaleLines = this.getScaleLines();
    var yPos = this.getHeight();
    var scaleLineGap = this.getScaleLineGap();
    var count = 0;
    var label = this.getLowerBound();

    while(scaleLines.total + 1 !== count) {
      var path = Path()
                .moveto({ x: 0, y: yPos })
                .hlineto({ x: this.props.width });

      scaleLinePaths.push(
        <g
          key={ count }
          transform={ 'translate(0, ' + this.props.gutter.top + ')' }>
          <path
            className="hui-YScale__line"
            d={ path.print() } />
          <text
            x={ this.props.gutter.left - 5 }
            y={ yPos - TEXTOFFSET }
            textAnchor="end"
            className="hui-YScale__label">
              { this.formatLabel(label) }
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
