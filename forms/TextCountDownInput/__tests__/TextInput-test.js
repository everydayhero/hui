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
