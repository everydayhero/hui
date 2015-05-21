"use strict";

jest.dontMock('../index');

describe('Separator', function() {
  var React       = require('react/addons');
  var Separator   = require('../');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var element;

  it('defaults to green', function() {
    element = TestUtils.renderIntoDocument(<Separator/>);
    findByClass(element, 'green');
  });

  it('can be white', function() {
    element = TestUtils.renderIntoDocument(<Separator color="white"/>);
    findByClass(element, 'white');
  });

  it('can be grey', function() {
    element = TestUtils.renderIntoDocument(<Separator color="grey"/>);
    findByClass(element, 'grey');
  });
});
