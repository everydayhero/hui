"use strict";

jest.dontMock('../');
jest.dontMock('../../InputErrors');
jest.dontMock('lodash');
jest.dontMock('moment');

describe('DatePicker', function() {
  var React       = require('react/addons');
  var Input       = require('../');
  var moment      = require('moment');
  var TestUtils   = React.addons.TestUtils;
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var scryByTag   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('defaults', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Input />);
      input = findByClass(element, 'hui-DateInput__input');
    });

    it('value of null', function() {
      expect(input.getDOMNode().value).toBe('');
    });

    it('id of null', function() {
      expect(input.getDOMNode().id).toBe(null);
    });

    it('name of null', function() {
      expect(input.getDOMNode().name).toBe(null);
    });

    it('no label element', function() {
      var labels = scryByTag(element, 'label');
      expect(labels.length).toBe(0);
    });
  });

  describe('properties', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Input value="2015-12-09" id="seven" />);
      input = findByClass(element, 'hui-DateInput__input');
    });

    it('value of 09/12/2015', function() {
      expect(input.getDOMNode().value).toBe('09/12/2015');
    });

    describe('Passed an id of seven', function() {
      it('id is seven', function() {
        expect(input.getDOMNode().id).toBe('seven');
      });
    });

    it('shows errors', function() {
      var element = TestUtils.renderIntoDocument(
            <Input errors={['foo']}/>
          );
      findByClass(element, 'hui-InputErrors');
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
            <Input onChange={ listener }/>
          );
      element.onDateChange(moment("2015-12-09"));

      expect(listener.mock.calls[0][0].target.value).toBe('2015-12-09');
    });
  });

  describe('placeholder behavior', function() {
    it('is there if there is no value', function() {
      var element = TestUtils.renderIntoDocument(<Input placeholder="words"/>);
      var label = findByClass(element, 'hui-DateInput__placeholder');
      expect(label.getDOMNode().textContent).toBe('words');
    });

    it('is not there if there is a value', function() {
      var element = TestUtils.renderIntoDocument(<Input placeholder="words" value="2015-12-09" />);
      var label = scryByClass(element, 'hui-DateInput__placeholder')[0];

      expect(label).toBeUndefined();
    });
  });

  describe('toggle datepicker', function() {
    it('shows/hides onClick', function() {
      var element = TestUtils.renderIntoDocument(<Input />);
      var input = findByClass(element, 'hui-DateInput__input');

      TestUtils.Simulate.click(input);

      expect(element.state.open).toBe(true);

      TestUtils.Simulate.click(input);

      expect(element.state.open).toBe(false);
    });
  });

  describe('clear field', function() {
    it('clears field on click clear field', function() {
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
          <Input value="2015-12-09" onChange={ listener } />
        );

      var clear = findByClass(element, 'hui-DateInput__clear');
      TestUtils.Simulate.click(clear);

      expect(listener.mock.calls[0][0].target.value).toBe(null);
    });
  });

  describe('formats', function() {
    it('allow optional display formats', function() {
      var element = TestUtils.renderIntoDocument(
          <Input value="2015-12-09" displayFormat="MM/DD/YYYY" />
        );
      var input = findByTag(element, 'input');

      expect(input.getDOMNode().value).toBe('12/09/2015');
    });

    it('allow optional value formats', function() {
      var element = TestUtils.renderIntoDocument(
          <Input value="2010-10-20 4:30 +0000"  valueFormat="YYYY-MM-DD HH:mm Z" />
        );
      var input = findByTag(element, 'input');

      expect(input.getDOMNode().value).toBe('20/10/2010');
    });

    it('outputs optional value formats', function() {
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
          <Input
            valueFormat="YYYY-MM-DD HH:mm Z"
            onChange={ listener } />
        );
      element.onDateChange(moment("2015-12-09"));

      expect(listener.mock.calls.length).toBe(1);
    });
  });
});
