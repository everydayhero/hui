'use strict'

import Button from '../index'

describe('Button', function() {
  var component;

  describe('with id', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button id="click-me" />);
    });

    it('renders a CTA button', function(){
      findByProp(component, 'id', 'click-me');
    });
  });

  describe('cta', function() {
    var clicked = false;

    beforeEach(function() {
      clicked = false;
      var onClick = () => clicked = true;

      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" onClick={ onClick }/>);
    });

    it('renders a CTA button', function(){
      findByClass(component, 'hui-Button--cta');
    });

    it('handles click events', function(){
      var node = scryByTag(component, 'button')[0];
      Simulate.click(node);

      clicked.should.equal(true);
    });
  });

  describe('primary', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="primary" label="Get Started" icon="chevron-right"/>);
    });

    it('renders a primary button', function(){
      findByClass(component, 'hui-Button--primary');
    });
  });

  describe('secondary', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="secondary" label="Get Started" icon="chevron-right"/>);
    });

    it('renders a secondary button', function(){
      findByClass(component, 'hui-Button--secondary');
    });
  });

  describe('tertiary', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="tertiary" label="Get Started" icon="chevron-right"/>);
    });

    it('renders a tertiary button', function(){
      findByClass(component, 'hui-Button--tertiary');
    });
  });

  describe('href', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" href="/foo" />);
    });

    it('renders an anchor when given a href', function(){
      scryByTag(component, 'a').length.should.equal(1);
    });
  });

  describe('inverse', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" inverse={ true } />);
    });

    it('inverses the button', function(){
      findByClass(component, 'hui-Button--inverse');
    });
  });

  describe('thin', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" thin={ true } />);
    });

    it('renders a thin button', function(){
      findByClass(component, 'hui-Button--thin');
    });
  });

  describe('slim', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" slim={ true } />);
    });

    it('renders a slim button', function(){
      findByClass(component, 'hui-Button--slim');
    });
  });

  describe('iconSpin', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="cta" label="Log In" icon="refresh" iconSpin={ true } />);
    });

    it('spins the icon', function(){
      findByClass(component, 'fa-spin');
    });
  });

  describe('iconLeft', function() {
    beforeEach(function() {
      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" iconLeft={ true } />);
    });

    it('renders the icon left', function(){
      findByClass(component, 'hui-Button--iconLeft');
    });
  });

  describe('disabled', function() {
    var clicked = false;

    beforeEach(function() {
      clicked = false;
      var onClick = () => clicked = true;

      component = renderIntoDocument(<Button kind="cta" label="Get Started" icon="chevron-right" disabled={ true } onClick={ onClick }/>);
    });

    it('disables the button', function(){
      var node = scryByTag(component, 'button')[0];
      Simulate.click(node);

      findByClass(component, 'hui-Button--disabled');
      clicked.should.equal(false);
    });
  });
});
