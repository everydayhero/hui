"use strict";

jest.dontMock('../');
jest.dontMock('lodash');
jest.dontMock('../../../test/helpers');

describe('FormRow', function() {
  var React       = require('react/addons');
  var FormRow     = require('../');
  var TestUtils   = React.addons.TestUtils;
  var helper = require('../../../test/helpers');

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
          <FormRow label="foo" id="bar" tip="tip"/>
        );

    it('does render a help text', function() {
      var label = findByClass(element, 'hui-FormRow__tip');

      expect(label.getDOMNode().textContent).toBe("tip");
    });

    it('does render with the id given to it', function() {
      var row = findByClass(element, 'hui-FormRow');
      helper.findRenderedDOMComponentWithProp(row, 'id', 'bar');
    });
  });
});
