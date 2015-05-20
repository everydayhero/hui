"use strict";

jest.autoMockOff();

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
      input = findByClass(element, 'hui-TextInput__input');
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
  });

  describe('properties', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Input value="2015-12-09" id="seven" />);
      input = findByClass(element, 'hui-TextInput__input');
    });

    it('value of 09/12/2015', function() {
      expect(input.getDOMNode().value).toBe('09/12/2015');
    });

    describe('Passed an id of seven', function() {
      it('id is seven', function() {
        expect(input.getDOMNode().id).toBe('seven');
      });
    });

  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var parsedValue;
      var initialValue = "2015-12-09";

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
            <Input onChange={ listener }/>
          );
      element.onDateChange(moment(initialValue));

      expect(parsedValue).toBe(initialValue);
    });
  });

  describe('toggle datepicker', function() {
    it('shows/hides onClick', function() {
      var element = TestUtils.renderIntoDocument(<Input />);
      var input = findByClass(element, 'hui-TextInput__input');

      TestUtils.Simulate.focus(input);

      expect(element.state.open).toBe(true);

      element._clickBody({target: 'foo'});

      expect(element.state.open).toBe(false);
    });
  });

  describe('clear field', function() {
    it('clears field on click clear field', function() {
      var parsedValue = 'foo';
      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input value="2015-12-09" onChange={ listener } />
        );

      var clear = findByClass(element, 'hui-TextInput__iconButton');
      element.close();
      TestUtils.Simulate.click(clear);

      expect(parsedValue).toBe(null);
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

      expect(listener.mock.calls.length).toBeGreaterThan(1);
    });
  });

  describe('type in date format', function() {
    it('allows typed in date with format DD/MM/YYYY', function() {
      var parsedValue;
      var initialValue = '12/09/1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format DD/MM/YY', function() {
      var parsedValue;
      var initialValue = '12/09/79';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format MMM DD YY', function() {
      var parsedValue;
      var initialValue = 'Sep 12 1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format DD MMM YY', function() {
      var parsedValue;
      var initialValue = '12 Sep 1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format Do MMM YY', function() {
      var parsedValue;
      var initialValue = '12th September 1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format MMM Do YY', function() {
      var parsedValue;
      var initialValue = '12th September 1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format DD-MM-YYYY', function() {
      var parsedValue;
      var initialValue = '12-09-1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format DD MM YYYY', function() {
      var parsedValue;
      var initialValue = '12 09 1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } />
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });

    it('allows typed in date with format MM DD YYYY when US countryCode set', function() {
      var parsedValue;
      var initialValue = '09 12 1979';

      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
          <Input onChange={ listener } countryCode="us"/>
        );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input, {target: {value: initialValue}});
      element.close()

      expect(parsedValue).toBe("1979-09-12");
    });
  });
});
