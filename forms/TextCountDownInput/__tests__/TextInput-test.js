"use strict";

jest.autoMockOff();

describe('TextInput', function() {
  var React       = require('react/addons');
  var TextInput   = require('../');
  var TestUtils   = React.addons.TestUtils;

  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('counter behavior', function() {
    var element, label;
    var listener = jest.genMockFunction();

    it('is there if it has counter', function() {
      element = TestUtils.renderIntoDocument(<TextInput onChange={ listener } />);
      findByClass(element, 'hui-TextCountDownInput__counter');
    });

    it('sets font colour to red when text length is at the limit', function() {
      element = TestUtils.renderIntoDocument(<TextInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        max={ 4 } />);
      findByClass(element, 'hui-TextCountDownInput__counter--maxed');
    });

    it("set font colour to normal when text length is far from limit", function() {
      element = TestUtils.renderIntoDocument(<TextInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        max={ 100 } />);
      label = scryByClass(element, 'hui-TextCountDownInput__counter--warn')[0];

      expect(label).toBeUndefined();
    });

    it("set font colour to orange when approaching limit", function() {
      element = TestUtils.renderIntoDocument(<TextInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        max={ 10 }
        warnMax={ 4 } />);
      findByClass(element, 'hui-TextCountDownInput__counter--warn');
    });
  });
});
