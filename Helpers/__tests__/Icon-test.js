"use strict";

jest.autoMockOff();

describe('Icon', function() {
  var React = require('react/addons');
  var Icon = require('../Icon');
  var TestUtils = React.addons.TestUtils;

  it('renders an icon with default className', function() {
    var element = TestUtils.renderIntoDocument(
        <Icon icon="lock"/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    expect(iconClass).toBe('hui-Icon fa fa-lock');
  });

  it('renders an icon with fixedWith className', function() {
    var element = TestUtils.renderIntoDocument(
        <Icon icon="lock" fixedWidth={ true }/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    expect(iconClass).toBe('hui-Icon fa fa-fw fa-lock');
  });

  it('renders an icon with spin className', function() {
    var element = TestUtils.renderIntoDocument(
        <Icon icon="lock" spin={true}/>
      );
    var iconClass = element.getDOMNode().children[0].className;
    expect(iconClass).toBe('hui-Icon fa fa-spin fa-lock');
  });
});
