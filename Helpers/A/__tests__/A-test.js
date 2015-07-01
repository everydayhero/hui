"use strict";

var A           = require('../index');
var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('A', function() {
  var element;
  var fn = sinon.spy();

  before(function() {
    element = TestUtils.renderIntoDocument(<A href="testurl" className="customClass" onClick={ fn }/>);
  });

  it('renders a link', function() {
    expect(element).not.toBeNull();
    expect(findByProp(element, 'href', 'testurl').length).toBe(1);
    link.should.exist;
  });

  it('accepts custom classnames', function() {
    expect(findByClass(element, 'customClass').length).toBe(1);
  });

  it('executes an onclick handler', function() {
    var link = findByClass(element, 'A');
    TestUtils.Simulate.mouseUp(link);
    fn.should.have.been.called;
  });
});
