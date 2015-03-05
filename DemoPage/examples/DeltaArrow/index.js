"use strict";

var React      = require('react');
var DeltaArrow = require('../../../graphs/DeltaArrow');
var Highlight  = require('react-highlight');

module.exports = React.createClass({
  displayName: 'DeltaArrowExample',

  getInitialState: function() {
    return {
      delta: 50,
    };
  },

  render: function() {
    if (this.state.hide) {
      return false;
    }

    return (
    <div>
      <h3 className="DemoPage__h3">DeltaArrow</h3>
      <div className="DemoPage__example--deltaarrow--stacked">
        <DeltaArrow {...this.state} />
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<DeltaArrow delta={ 50 } />' }
      </Highlight>
    </div>
    );
  }
});
