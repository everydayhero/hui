'use strict';

var Icon = require('../');

describe('Icon', function() {
  it('renders an icon with default className', function() {
    var element = TestUtils.renderIntoDocument(
        <Icon icon="lock"/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    iconClass.should.equal('hui-Icon fa fa-lock');
  });

  it('renders an icon with fixedWidth className', function() {
    var element = TestUtils.renderIntoDocument(
        <Icon icon="lock" fixedWidth={ true }/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    iconClass.should.equal('hui-Icon fa fa-fw fa-lock');
  });

  it('renders an icon with spin className', function() {
    var element = TestUtils.renderIntoDocument(<Icon icon="lock" spin={ true }/>);
    var iconClass = element.getDOMNode().children[0].className;
    iconClass.should.equal('hui-Icon fa fa-spin fa-lock');
  });
});
