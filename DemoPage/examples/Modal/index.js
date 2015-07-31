'use strict';

var React    = require('react');
var Overlay  = require('../../../modals/Overlay');
var Progress = require('../../../modals/Progress');

module.exports = React.createClass({
  displayName: 'ModalExample',

  getInitialState: function() {
    return {
      open: false,
      active: 1
    }
  },

  open: function(e) {
    e.preventDefault();
    this.setState({ open: true });
  },

  close: function(e) {
    e.preventDefault();
    this.setState({ open: false });
  },

  onChange: function(index) {
    this.setState({ active: index });
  },

  render: function() {
    var state = this.state;

    return (
      <div>
        <a href="#" onClick={ this.open }>Open Overlay</a>
        <Overlay open={ state.open } onClose={ this.close }>
          <Progress total={ 4 } active={ state.active } onChange={ this.onChange } />
        </Overlay>
      </div>
    );
  }
});
