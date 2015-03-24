"use strict";

var React     = require('react');
var Highlight = require('react-highlight');
var Legend    = require('../../../graphs/DataVisualisation/Legend');

module.exports = React.createClass({
  displayName: 'LegendExample',

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
      <div>
        <h3 className="DemoPage__h3">Legend</h3>
        <div className="DemoPage__example--legend">
          <Legend labels={[ 'Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4', 'Campaign 5', 'Campaign 6', 'Campaign 7' ]} />
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight className='html'>
          { '<Legend labels={[ \'Campaign 1\', \'Campaign 2\', \'Campaign 3\' ]} />' }
        </Highlight>
      </div>
    );
  }
});
