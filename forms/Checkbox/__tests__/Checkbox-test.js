"use strict";

jest.dontMock('../');
jest.dontMock('../../InputErrors');

describe('Checkbox', function() {
  var React       = require('react/addons');
  var Input       = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('defaults', function() {
    var element = TestUtils.renderIntoDocument(
      <Input/>
    );
    var input = findByTag(element, 'input');

    it('type of checkbox', function() {
      expect(input.getDOMNode().type).toBe('checkbox');
    });

    it('value of null', function() {
      expect(input.getDOMNode().value).toBe(null);
    });

    it('id of null', function() {
      expect(input.getDOMNode().id).toBe(null);
    });

    it('name of null', function() {
      expect(input.getDOMNode().name).toBe(null);
    });
  });

  describe('with clickable label', function() {
    var element = TestUtils.renderIntoDocument(
      <Input
        label={ 'free tacos' }
        labelIsClickable={ true } />
    );

    it('contains a span label', function() {
      var label = findByClass(element, 'hui-Checkbox__label');

      expect(label.getDOMNode().nodeName.toLowerCase()).toBe('label');
    });
  });

  describe('with non-clickable label', function() {
    var element = TestUtils.renderIntoDocument(
      <Input
        label={ 'free tacos' }
        labelIsClickable={ false } />
    );

    it('contains a span label', function() {
      var label = findByClass(element, 'hui-Checkbox__label');

      expect(label.getDOMNode().nodeName.toLowerCase()).toBe('span');
    });
  });

  describe('properties', function() {
    var listener = jest.genMockFunction();
    var element = TestUtils.renderIntoDocument(
      <Input value={ true } onChange={ listener } id="seven" />
    );
    var input = findByTag(element, 'input');

    it('type of checkbox', function() {
      expect(input.getDOMNode().type).toBe('checkbox');
    });

    it('value of true', function() {
      expect(input.getDOMNode().checked).toBe(true);
    });

    describe('Passed an id of seven', function() {
      it('id is seven', function() {
        expect(input.getDOMNode().id).toBe('seven');
      });

      it('name is seven', function() {
        expect(input.getDOMNode().name).toBe('seven');
      });
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
        <Input onChange={listener}/>
      );

      expect(listener.mock.calls.length).toBe(0);
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input);
      expect(listener.mock.calls.length).toBe(1);
    });
  });

  describe('validation behavior', function() {
    it('defaults valid to true', function() {
      var element = TestUtils.renderIntoDocument(
        <Input/>
      );
      var errorClasses = scryByClass(element, 'hui-Input--error');
      expect(errorClasses.length).toBe(0);
    });

    it('when valid no hui-Input--error class', function() {
      var element = TestUtils.renderIntoDocument(
        <Input valid={true}/>
      );
      var errorClasses = scryByClass(element, 'hui-Input--error');
      expect(errorClasses.length).toBe(0);
    });

    it('when invalid there is a hui-Input--error class', function() {
      var element = TestUtils.renderIntoDocument(
        <Input valid={false}/>
      );
      var errorClasses = scryByClass(element, 'hui-Input--error');
      expect(errorClasses.length).toBe(1);
    });

    it('shows errors', function() {
      var element = TestUtils.renderIntoDocument(
        <Input valid={false} errors={ ['foo'] } />
      );
      var errorClasses = scryByClass(element, 'hui-InputErrors');
      expect(errorClasses.length).toBe(1);
    });
  });
});
