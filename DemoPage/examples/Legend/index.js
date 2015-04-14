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
          <Legend keys={[
            { label: 'Campaign 1', className: 'exampleClass1' },
            { label: 'Campaign 2' },
            { label: 'Campaign 3' },
            { label: 'Campaign 4' },
            { label: 'Campaign 5' },
            { label: 'Campaign 6' },
            { label: 'Campaign 7' }]} />
        </div>

        <h4 className="DemoPage__h4">React Example</h4>
        <Highlight className='html'>
          { '<Legend keys={[ { label: \'Campaign 1\', className: \'exampleClass1\' } , { label: \'Campaign 2\' }, { label:\'Campaign 3\' } ]} />' }
        </Highlight>
      </div>
    );
  }
});
