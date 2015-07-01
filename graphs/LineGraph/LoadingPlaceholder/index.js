'use strict';

var React = require('react');
var Path  = require('paths-js/path');

module.exports = React.createClass({
  displayName: 'LoadingPlaceholder',

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    numberOfLines: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      numberOfLines: 3
    }
  },

  render: function() {
    var props = this.props;
    var height = props.height;
    var width = props.width;
    var numberOfLines = props.numberOfLines;
    var scaleLinePaths = [];
    var yPosInterval = height / (numberOfLines + 1);
    var yPos;

    for (var i = 0; i < numberOfLines; i++) {
      yPos = (i + 1) * yPosInterval;

      var path = Path().moveto({ x: 0, y: yPos })
                       .hlineto({ x: width });

      scaleLinePaths.push(
        <g key={ i } transform={ "translate(0, 0)" }>
          <path className="hui-YScale__line" d={ path.print() } />
        </g>
      );
    }

    return (
      <g className="hui-YScale">
        { scaleLinePaths }
      </g>
    );
  }
});
