'use strict';

var React            = require('react');
var OnboardingWizard = require('./OnboardingWizard');
var renderModal = require('../../../lib/renderModal');

module.exports = React.createClass({
  displayName: 'WizardExample',

  open: function(e) {
    e.preventDefault();
    renderModal(OnboardingWizard);
  },

  render: function() {
    return (
      <div>
        <a href="#" onClick={ this.open }>Open Overlay</a>
      </div>
    );
  }
});
