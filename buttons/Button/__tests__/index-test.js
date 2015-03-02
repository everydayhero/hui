"use strict";
jest.autoMockOff();

var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var Button      = require('../index');
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var scryByTag   = TestUtils.scryRenderedDOMComponentsWithTag;

describe('Button', function() {
  var component;

  describe('cta', function() {
    var clicked = false;

    beforeEach(function() {
      clicked = false;
      var onClick = function(){
        clicked = true;
      }
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' onClick={ onClick }/>
      );
    });

    it('renders a CTA button', function(){
      findByClass(component, 'hui-Button--cta');
    });

    it('handles click events', function(){
      var node = scryByTag(component, 'button')[0];
      React.addons.TestUtils.Simulate.mouseUp(node);

      expect(clicked).toBe(true);
    });
  });

  describe('primary', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='primary' label='Get Started' icon='chevron-right'/>
      );
    });

    it('renders a primary button', function(){
      findByClass(component, 'hui-Button--primary');
    });
  });

  describe('secondary', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='secondary' label='Get Started' icon='chevron-right'/>
      );
    });

    it('renders a secondary button', function(){
      findByClass(component, 'hui-Button--secondary');
    });
  });

  describe('tertiary', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='tertiary' label='Get Started' icon='chevron-right'/>
      );
    });

    it('renders a tertiary button', function(){
      findByClass(component, 'hui-Button--tertiary');
    });
  });

  describe('href', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' href="/foo" />
      );
    });

    it('renders an anchor when given a href', function(){
      expect(scryByTag(component, 'a').length).toBe(1);
    });
  });

  describe('inverse', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' inverse={ true } />
      );
    });

    it('inverses the button', function(){
      findByClass(component, 'hui-Button--inverse');
    });
  });

  describe('thin', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' thin={ true } />
      );
    });

    it('renders a thin button', function(){
      findByClass(component, 'hui-Button--thin');
    });
  });

  describe('iconLeft', function() {
    beforeEach(function() {
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' iconLeft={ true } />
      );
    });

    it('renders the icon left', function(){
      findByClass(component, 'hui-Button--iconLeft');
    });
  });

  describe('disabled', function() {
    var clicked = false;

    beforeEach(function() {
      clicked = false;
      var onClick = function(){
        clicked = true;
      }
      component = TestUtils.renderIntoDocument(
        <Button kind='cta' label='Get Started' icon='chevron-right' disabled={ true } onClick={ onClick }/>
      );
    });

    it('disables the button', function(){
      var node = scryByTag(component, 'button')[0];
      React.addons.TestUtils.Simulate.mouseUp(node);

      findByClass(component, 'hui-Button--disabled');
      expect(clicked).toBe(false);
    });
  });
});
