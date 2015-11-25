'use strict';

var Icon = require('../');

describe('Icon', function() {
  it('renders an icon with default className', function() {
    var element = renderIntoDocument(
        <Icon icon="lock"/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    iconClass.should.equal('hui-Icon fa fa-lock');
  });

  it('renders an icon with fixedWidth className', function() {
    var element = renderIntoDocument(
        <Icon icon="lock" fixedWidth={ true }/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    iconClass.should.equal('hui-Icon fa fa-fw fa-lock');
  });

  it('renders an icon with spin className', function() {
    var element = renderIntoDocument(<Icon icon="lock" spin={ true }/>);
    var iconClass = element.getDOMNode().children[0].className;
    iconClass.should.equal('hui-Icon fa fa-spin fa-lock');
  });

  it('executes an onClick handler', function() {
    var handler = sinon.spy();
    var element = renderIntoDocument(<Icon icon="lock" onClick={ handler }/>);
    Simulate.mouseDown(findByClass(element, 'hui-IconWrapper'));
    handler.should.have.been.called;
  });

  it('does not execute an onClick handler when disabled', function() {
    var handler = sinon.spy();
    var element = renderIntoDocument(<Icon disabled={ true } icon="lock" onClick={ handler }/>);
    Simulate.mouseDown(findByClass(element, 'hui-IconWrapper'));
    handler.should.not.have.been.called;
  });
});
