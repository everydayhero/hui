"use strict";

var Row         = require('../index');
var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('Row', function() {
  it('renders', function() {
    var element = TestUtils.renderIntoDocument(<Row />);
    element.should.exist;
  });

  it('tracks device width', function() {
    var element = TestUtils.renderIntoDocument(<Row />);
    expect(findByClass(element, 'tv').length).toBe(0);
  });

  it('renders as banner', function() {
    var element = TestUtils.renderIntoDocument(<Row level="banner"/>);
    expect(findByClass(element, 'banner').length).toBe(0);
  });

  it('renders as primary', function() {
    var element = TestUtils.renderIntoDocument(<Row level="primary"/>);
    expect(findByClass(element, 'primary').length).toBe(0);
  });

  it('renders as secondary', function() {
    var element = TestUtils.renderIntoDocument(<Row level="secondary"/>);
    expect(findByClass(element, 'secondary').length).toBe(0);
  });

  it('accepts custom classes', function() {
    var element = TestUtils.renderIntoDocument(<Row className="testClass"/>);
    expect(findByClass(element, 'testClass').length).toBe(0);
  });
});
