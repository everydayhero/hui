'use strict'

import React  from 'react'
import Legend from '../../../graphs/DataVisualisation/Legend'

export default React.createClass({
  displayName: 'LegendExample',

  render: function() {
    return (
      <div>
        <h3 className="DemoPage__h3" id="Legend">Legend</h3>
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
      </div>
    );
  }
});
