'use strict';

var React   = require('react');
var Overlay = require('../../../atoms/Overlay');
var Step    = require('../../../wizard/Step');
var Wizard  = require('../../../wizard');
var Button  = require('../../../buttons/Button');
var Router  = require('react-router');

module.exports = React.createClass({
  displayName: 'OnboardingWizard',

  mixins: [Router.State, Router.Navigation],

  onChange: function(step) {
    this.transitionTo('wizard', { step });
  },

  next: function() {
    this.onChange(parseInt(this.getParams().step) + 1);
  },

  close: function() {
    this.transitionTo('root');
  },

  render: function() {
    var step = this.getParams().step;

    var steps = [
      <Step key="1">
        <h2 className="Step__header">
          Add a Profile Photo
        </h2>
        <p className="Step__description">
          Your donors want to see who they’re supporting, show them by adding a photo to your page.
        </p>
        <p className="Step__proof">
          People who do this raise up to <span className="Step__proof_value">10 times</span> more.
        </p>
        <Button borderless={ true } kind="primary" label="Skip" icon="chevron-right" onClick={ this.next } />
      </Step>,

      <Step key="2">
        <h2 className="Step__header">
          Explain why you care
        </h2>
        <p className="Step__description">
           Tell people what motivated you to start fundraising and why you chose to support your charity.
        </p>
        <p className="Step__proof">
          People who do this raise up to <span className="Step__proof_value">74% more</span> than those who don’t.
        </p>
        <Button borderless={ true } kind="primary" label="Skip" icon="chevron-right" onClick={ this.next } />
      </Step>,

      <Step key="3">
        <h2 className="Step__header">
          Share your page
        </h2>
        <p className="Step__description">
          Our most successful fundraisers share their page within an hour of creating it, so start asking friends and family for support now!
        </p>
        <p className="Step__proof">
          People who share their page within an hour of creating it generally <span className="Step__proof_value">raise 52% more</span> than everyone else.
        </p>
        <Button borderless={ true } kind="primary" label="Skip" icon="chevron-right" onClick={ this.next } />
      </Step>,

      <Step key="4">
        <h2 className="Step__header">
          Make a donation to your page
        </h2>
        <p className="Step__description">
          Nothing shows enthusiasm for your cause like kicking of the donations yourself. The first donation sets the mode for the rest of the donations, so aim as high as you can!!
        </p>
        <p className="Step__proof">
          People who have a donation in the first hour <span className="Step__proof_value">raise 33% more</span>..
        </p>
        <Button borderless={ true } kind="primary" label="Skip" icon="chevron-right" onClick={ this.close } />
      </Step>
    ];

    return (
      <Overlay onClose={ this.close } inverse={ true }>
        <Wizard currentStep={ step } onChange={ this.onChange } children={ steps } />
      </Overlay>
    );
  }
});
