'use strict';

var React       = require('react');
var Overlay     = require('../../../atoms/Overlay');
var Step        = require('../../../wizard/Step');
var Wizard      = require('../../../wizard');

module.exports = React.createClass({
  displayName: 'OnboardingWizard',

  getInitialState: function() {
    return {
      active: 1
    }
  },

  onChange: function(index) {
    this.setState({ active: index });
  },

  render: function() {
    var state = this.state;
    var props = this.props;
    var steps = [<Step key="1">Step 1</Step>, <Step key="2">Step 2</Step>, <Step key="3">Step 3</Step>];

    return (
      <Overlay onClose={ props.onClose } inverse={ true }>
        <Wizard active={ state.active } onChange={ this.onChange } steps={ steps } />
      </Overlay>
    );
  }
});
