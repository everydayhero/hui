"use strict";

var A = require('../');

describe('A', function() {
  var element;
  var fn = sinon.spy();

  before(function() {
    element = TestUtils.renderIntoDocument(<A href="testurl" className="customClass" onClick={ fn }/>);
  });

  it('renders a link', function() {
    element.should.exist;
    var link = findByProp(element, 'href', 'testurl');
    link.should.exist;
  });

  it('accepts custom classnames', function() {
    var link = findByClass(element, 'customClass');
    link.should.exist;
  });

  it('executes an onclick handler', function() {
    var link = findByClass(element, 'A');
    TestUtils.Simulate.mouseUp(link);
    fn.should.have.been.called;
  });
});
