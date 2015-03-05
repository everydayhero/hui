"use strict";

jest.autoMockOff();

describe('TextInput', function() {
  var React       = require('react/addons');
  var TextInput   = require('../');
  var TestUtils   = React.addons.TestUtils;

  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByTag   = TestUtils.scryRenderedDOMComponentsWithTag;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('defaults', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<TextInput />);
      input = findByTag(element, 'input');
    });

    it('type of text', function() {
      expect(input.getDOMNode().type).toBe('text');
    });

    it('value of null', function() {
      expect(input.getDOMNode().value).toBe('');
    });

    it('id of null', function() {
      expect(input.getDOMNode().id).toEqual('text-input-1');
    });

    it('name of null', function() {
      expect(input.getDOMNode().name).toBe(null);
    });

    it('readOnly', function() {
      expect(input.getDOMNode().readOnly).toBe(false);
    });

    it('no placeholder element', function() {
      var placeholders = scryByTag(element, 'placeholder');
      expect(placeholders.length).toBe(0);
    });
  });

  describe('properties', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<TextInput
        type="email"
        value="six"
        id="seven"
        name="eight"
        readOnly={ true } />);
      input = findByTag(element, 'input');
    });

    it('type of email', function() {
      expect(input.getDOMNode().type).toBe('email');
    });

    it('value of six', function() {
      expect(input.getDOMNode().value).toBe('six');
    });

    it('id is TextInput-seven', function() {
      expect(input.getDOMNode().id).toBe('seven');
    });

    it('name is TextInput-seven', function() {
      expect(input.getDOMNode().name).toBe('eight');
    });

    it('readOnly', function() {
      expect(input.getDOMNode().readOnly).toBe(true);
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(<TextInput onChange={listener} />);
      var input = findByTag(element, 'input');

      TestUtils.Simulate.change(input);

      expect(listener.mock.calls.length).toBe(1);
    });
  });

  describe('placeholder behavior', function() {
    var element, label;
    var change = jest.genMockFunction();

    it('is there if there is no value', function() {
      element = TestUtils.renderIntoDocument(<TextInput placeholder="words" />);
      label = findByClass(element, 'hui-TextInput__placeholder');

      expect(label.getDOMNode().textContent).toEqual('words');
    });

    it('is not there if there is a value', function() {
      element = TestUtils.renderIntoDocument(<TextInput value="foobar" onChange={ change } placeholder="words" />);
      label = scryByClass(element, 'hui-TextInput__placeholder')[0];

      expect(label).toBeUndefined();
    });
  });

  describe('validation behavior', function() {
    var element, errorClasses;

    it('defaults valid to true', function() {
      element = TestUtils.renderIntoDocument(<TextInput/>);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).toBe(0);
    });

    it('does not have TextInput--error class when errors is null', function() {
      element = TestUtils.renderIntoDocument(<TextInput errors={ null } />);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).toBe(0);
    });

    it('does not have TextInput--error class when errors is empty', function() {
      element = TestUtils.renderIntoDocument(<TextInput errors={ [] } />);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).toBe(0);
    });

    it('does have TextInput--error class when errors is present', function() {
      element = TestUtils.renderIntoDocument(<TextInput errors={ ['foobar'] } />);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).toBe(1);
    });
  });

  describe('counter behavior', function() {
    var element, label;
    var listener = jest.genMockFunction();

    it('is there if it has counter', function() {
      element = TestUtils.renderIntoDocument(<TextInput onChange={ listener } hasCounter={ true } />);
      findByClass(element, 'hui-TextInput--counter');
    });

    it('is not there if it does not set', function() {
      element = TestUtils.renderIntoDocument(<TextInput value="foobar" onChange={ listener } />);
      label = scryByClass(element, 'hui-TextInput--counter')[0];

      expect(label).toBeUndefined();
    });

    it('sets font colour to red when text length is close to limit', function() {
      element = TestUtils.renderIntoDocument(<TextInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        maxLength={ 10 } />);
      findByClass(element, 'hui-TextInput--counter--warning');
    });

    it("set font colour to normal when text length is far from limit", function() {
      element = TestUtils.renderIntoDocument(<TextInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        maxLength={ 100 } />);
      label = scryByClass(element, 'hui-TextInput--counter--warning')[0];

      expect(label).toBeUndefined();
    });
  });
});
