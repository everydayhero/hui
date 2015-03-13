"use strict";

var React      = require('react');
var DeltaArrow = require('../../../graphs/DeltaArrow');
var Highlight  = require('react-highlight');

module.exports = React.createClass({
  displayName: 'DeltaArrowExample',

  render: function() {
    var n = null;

    return (
    <div>
      <h3 className="DemoPage__h3">DeltaArrow</h3>
      <div className="DemoPage__example--deltaarrow--stacked">
        <DeltaArrow delta={ 0.5 } />
        <DeltaArrow delta={ -0.5 } />
        <DeltaArrow delta={ n } />
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<DeltaArrow delta={ 0.5 } />' }
      </Highlight>
    </div>
    );
  }
});
