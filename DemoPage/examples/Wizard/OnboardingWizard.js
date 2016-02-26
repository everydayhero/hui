'use strict';

import React       from 'react'
import Overlay     from '../../../atoms/Overlay'
import Step        from '../../../wizard/Step'
import Wizard      from '../../../wizard'
import Button      from '../../../buttons/Button'
import AvatarInput from '../../../forms/AvatarInput'
import TextArea    from '../../../forms/TextArea'

import Router  from 'react-router'

export default React.createClass({
  displayName: 'OnboardingWizard',

  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      page: {},
      updateInProgress: false
    }
  },

  onChange: function(step) {
    this.transitionTo('wizard', { step });
  },

  next: function() {
    this.onChange(parseInt(this.getParams().step) + 1);
  },

  close: function() {
    this.transitionTo('root');
  },

  onInputChange: function(key) {
    var component = this;

    return function(value) {
      var page = component.state.page;
      page[key] = value;
      component.setState({ page });
    }
  },

  render: function() {
    var step = this.getParams().step;
    var page = this.state.page;

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
        <AvatarInput value={ page.avatar } onChange={ this.onAvatarChange }/>
        <Button borderless={ true } kind="primary" label="Skip" icon="chevron-right" onClick={ this.next } />
      </Step>,

      <Step key="2">
        <h2 className="Step__header">
          A few words about why you are fundraising
        </h2>
        <p className="Step__description">
           Tell people what motivated you to start fundraising and why you chose to support your charity.
        </p>
        <p className="Step__proof">
          People who do this raise up to <span className="Step__proof_value">74% more</span> than those who don’t.
        </p>
        <TextArea value={ page.story } onChange={ this.onInputChange('story') } label="Your Story"/>
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
      <Overlay onClose={ this.close } inverse={ true } scroll={ true }>
        <Wizard currentStep={ step } onChange={ this.onChange } children={ steps } />
      </Overlay>
    );
  }
});
