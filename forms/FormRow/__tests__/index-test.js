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
  });

  describe('properties', function() {
    var element = TestUtils.renderIntoDocument(
          <FormRow label="foo" className="bar" tip="tip"/>
        );

    it('does render a help text', function() {
      var label = findByClass(element, 'hui-FormRow__tip');

      expect(label.getDOMNode().textContent).toBe("tip");
    });

    it('does render with the className given to it', function() {
      findByClass(element, 'bar');
    });
  });
});
