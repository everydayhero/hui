'use strict';

var TextCountDownInput   = require('../');

describe('TextCountDownInput', function() {
  describe('counter behavior', function() {
    var element, label;
    var listener = sinon.spy();

    it('is there if it has counter', function() {
      element = renderIntoDocument(<TextCountDownInput onChange={ listener } />);
      findByClass(element, 'hui-TextCountDownInput__counter');
    });

    it('sets font colour to red when text length is at the limit', function() {
      element = renderIntoDocument(<TextCountDownInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        max={ 4 } />);
      findByClass(element, 'hui-TextCountDownInput__counter--maxed');
    });

    it('set font colour to normal when text length is far from limit', function() {
      element = renderIntoDocument(<TextCountDownInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        max={ 100 } />);
      label = scryByClass(element, 'hui-TextCountDownInput__counter--warn')[0];

      expect(label).to.not.exist;
    });

    it('set font colour to orange when approaching limit', function() {
      element = renderIntoDocument(<TextCountDownInput
        onChange={ listener }
        hasCounter={ true }
        value={ '12345' }
        max={ 10 }
        warnMax={ 4 } />);
      findByClass(element, 'hui-TextCountDownInput__counter--warn');
    });
  });
});
