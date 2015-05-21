"use strict";

jest.dontMock('../');

describe('Fieldset', function() {
  var React       = require('react/addons');
  var Fieldset    = require('../');
  var TestUtils   = React.addons.TestUtils;

  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('defaults', function() {
    var element = TestUtils.renderIntoDocument(
          <Fieldset/>
        );

    it('it renders a Fieldset', function() {
      findByClass(element, 'Fieldset');
    });

    it('does not render a legend', function() {
      var legends = scryByClass(element, 'Fieldset__legend');

      expect(legends.length).toBe(0);
    });
  });

  describe('legend', function() {
    var element = TestUtils.renderIntoDocument(
          <Fieldset legend="foo"/>
        );

    it('does render a legend', function() {
      var label = findByClass(element, 'Fieldset__legend');

      expect(label.getDOMNode().textContent).toBe("foo");
    });
  });
});
