"use strict";
jest.autoMockOff();

var React           = require('react/addons');
var TestUtils       = React.addons.TestUtils;
var LoadingProgress = require('../');
var findByClass     = TestUtils.findRenderedDOMComponentWithClass;

describe('LoadingProgress', function() {
   it('does not show progress state if "inProgress" flag is false', function() {
    var componenet = <LoadingProgress inProgress={ false } />;
    var element = TestUtils.renderIntoDocument(componenet);

    findByClass(element, 'hui-LoadingProgress__bar');
  });

  it('shows progress state if "inProgress" flag is true', function() {
    var componenet = <LoadingProgress inProgress={ true } />;
    var element = TestUtils.renderIntoDocument(componenet);

    findByClass(element, 'hui-LoadingProgress__bar--inProgress');
  });

  it('does adds the previous width of the bar after progress completed', function() {
    var componenet = <LoadingProgress inProgress={ true } />;
    var element = TestUtils.renderIntoDocument(componenet);

    element.setProps({
      inProgress: false
    });

    expect(element.style().width).toEqual('100%');
  });
});
