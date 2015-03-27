"use strict";

jest.autoMockOff();

describe('ToolTip', function() {
  var React       = require('react/addons');
  var ToolTip     = require('../index');
  var TestUtils   = React.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  var data = { date: '2015-02-26', value: 123, total: 456 };

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<ToolTip />);
    });

    it('should not render ToolTip', function() {
      expect(scryByClass(component, 'hui-ToolTip').length).toBe(0);
    });
  });

  describe('display', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<ToolTip data={ data } show={ true } />);
    });

    it('should render ToolTip', function() {
      expect(scryByClass(component, 'hui-ToolTip').length).toBe(1);
    });

    it('should not flip over the tooltip', function() {
      expect(scryByClass(component, 'hui-ToolTip--left').length).toBe(0);
    });

    it('should render the line on the left', function() {
      expect(scryByClass(component, 'hui-ToolTip__text--left').length).toBe(1);
    });

    it('should render the date', function() {
      expect(scryByClass(component, 'hui-ToolTip__date').length).toBe(1);
    });

    it('should render the value', function() {
      expect(scryByClass(component, 'hui-ToolTip__value').length).toBe(1);
    });

    it('should render the total', function() {
      expect(scryByClass(component, 'hui-ToolTip__total').length).toBe(1);
    });
  });

  describe('formated', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<ToolTip data={ data } show={ true } totalFormat={ '0.00a' }/>);
    });

    it('should render the total formated', function() {
      expect(findByClass(component, 'hui-ToolTip__total').getDOMNode().textContent).toContain('456.00');
    });
  });

  describe('flip over behaviour', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<ToolTip data={ data } show={true} isFlipOver={ true } />);
    });

    it('should flip over the tooltip', function() {
      expect(scryByClass(component, 'hui-ToolTip--left').length).toBe(1);
    });

    it('should render the line on the right', function() {
      expect(scryByClass(component, 'hui-ToolTip__text--right').length).toBe(1);
    });
  });
});
