"use strict";

jest.autoMockOff();

describe('SelectInput', function() {
  var React       = require('react/addons');
  var Select      = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByTag   = TestUtils.scryRenderedDOMComponentsWithTag;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
  var options = [
        { value: 'six', label: 'Item 6' },
        { value: 'seven', label: 'Item 7' }
      ];

  describe('defaults', function() {
    var element, select;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(
          <Select options={ [{value: 1, label: 'Item x'}] } prompt='Please select' />
        );
      select = findByTag(element, 'select');
    });

    it('value of null', function() {
      expect(select.getDOMNode().value).toBe('1');
    });

    it('id of null', function() {
      expect(select.getDOMNode().id).toBe(null);
    });

    it('name of null', function() {
      expect(select.getDOMNode().name).toBe(null);
    });

    it('no label element', function() {
      var labels = scryByTag(element, 'label');

      expect(labels.length).toBe(0);
    });

    it('does not render blank option', function() {
      var firstOption = scryByTag(element, 'option')[0];
      var node = firstOption.getDOMNode();

      expect(node.value).toEqual('1');
      expect(node.textContent).toEqual('Item x');
    });
  });

  describe('properties', function() {
    var element, select;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(
          <Select
            type="email"
            value="six"
            id="seven"
            includeBlank={ true }
            options={ options } />
        );
      select = findByTag(element, 'select');
    });

    it('value of six', function() {
      expect(select.getDOMNode().value).toBe('six');
    });

    it('display value when selction', function() {
      var display = findByClass(element, 'hui-SelectInput__selected');

      expect(display.getDOMNode().textContent).toContain("Item 6");
    });

    it('id is select-seven', function() {
      expect(select.getDOMNode().id).toBe('seven');
    });

    it('name is select-seven', function() {
      expect(select.getDOMNode().name).toBe('seven');
    });

    it('blank option is rendered', function() {
      var firstOption = scryByTag(element, 'option')[0];
      var node = firstOption.getDOMNode();

      expect(node.value).toEqual('');
      expect(node.textContent).toEqual('');
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
            <Select
              onChange={ listener }
              options={ options } />
          );

      expect(listener.mock.calls.length).toBe(0);

      var select = findByTag(element, 'select');
      TestUtils.Simulate.change(select);

      expect(listener.mock.calls.length).toBe(1);
    });
  });

  describe('label behavior', function() {
    var element, label, labels;

    it('says what the label says', function() {
      element = TestUtils.renderIntoDocument(
        <Select label="words"/>
      );
      label = findByTag(element, 'label');

      expect(label.getDOMNode().textContent).toBe('words');
    });

    it('is there if there is no value', function() {
      element = TestUtils.renderIntoDocument(
        <Select label="words"/>
      );
      labels = scryByTag(element, 'label');

      expect(labels.length).toBe(1);
    });

    it('is not there if there is a value', function() {
      element = TestUtils.renderIntoDocument(
        <Select label="words" value="seven" />
      );
      labels = scryByTag(element, 'label');

      expect(labels.length).toBe(0);
    });
  });

  describe('validation behavior', function() {
    var element, errorClasses;

    it('defaults valid to true', function() {
      element = TestUtils.renderIntoDocument(
        <Select/>
      );
      errorClasses = scryByClass(element, 'hui-Input--error');

      expect(errorClasses.length).toBe(0);
    });

    it('when valid no hui-Input--error class', function() {
      element = TestUtils.renderIntoDocument(
        <Select valid={true} />
      );
      errorClasses = scryByClass(element, 'hui-Input--error');

      expect(errorClasses.length).toBe(0);
    });

    it('when invalid there is a hui-Input--error class', function() {
      element = TestUtils.renderIntoDocument(
        <Select valid={false} />
      );
      errorClasses = scryByClass(element, 'hui-Input--error');

      expect(errorClasses.length).toBe(1);
    });

    it('shows errors', function() {
      element = TestUtils.renderIntoDocument(
        <Select valid={false} errors={['foo']} />
      );
      errorClasses = scryByClass(element, 'hui-InputErrors');

      expect(errorClasses.length).toBe(1);
    });
  });
});
