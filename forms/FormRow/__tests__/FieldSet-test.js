"use strict";

jest.dontMock('../');
jest.dontMock('lodash');

describe('FormRow', function() {
  var React       = require('react/addons');
  var FormRow     = require('../');
  var TestUtils   = React.addons.TestUtils;

  var findByClass = TestUtils.findRenderedDOMComponentWithClass;

  describe('defaults', function() {
    var element = TestUtils.renderIntoDocument(
          <FormRow/>
        );

    it('it renders a FormRow', function() {
      findByClass(element, 'hui-FormRow');
    });

    it('does not render a label', function() {
      var error;
      try {
        findByClass(element, 'hui-FormRow__label');
      } catch(e) {
        error = e;
      }

      expect(error).toBeDefined();
    });
  });

  describe('properties', function() {
    var element = TestUtils.renderIntoDocument(
          <FormRow label="foo" className="bar" hint="hint"/>
        );

    it('does render a label', function() {
      var label = findByClass(element, 'hui-FormRow__label');

      expect(label.getDOMNode().textContent).toBe("foo");
    });

    it('does render a hint', function() {
      var label = findByClass(element, 'hui-FormRow__hint');

      expect(label.getDOMNode().textContent).toBe("hint");
    });

    it('add a custom className', function() {
      findByClass(element, 'bar');
    });
  });
});
