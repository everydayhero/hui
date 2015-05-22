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
    var separatorImagePath = "images/separator_white.png";
    element = TestUtils.renderIntoDocument(<Separator color="white" 
      separatorImagePath={ separatorImagePath }/>);
    findByClass(element, 'white');
  });

  it('can be grey', function() {
    var separatorImagePath = "images/separator_grey.png";
    element = TestUtils.renderIntoDocument(<Separator color="grey" 
      separatorImagePath={ separatorImagePath }/>);
    findByClass(element, 'grey');
  });
});
