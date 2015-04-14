"use strict";

jest.autoMockOff();

describe('Legend', function() {
  var React     = require('react/addons');
  var Legend    = require('../index');
  var TestUtils = React.addons.TestUtils;

  var keys = [
    { label: 'label1', className: 'ClassName1' },
    { label: 'label2', className: 'ClassName2' },
    { label: 'label3', className: 'ClassName3' },
    { label: 'label4', className: 'ClassName4' },
    { label: 'label5', className: 'ClassName5' },
    { label: 'label6', className: 'ClassName6' }
  ];

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<Legend keys={ keys } />);
      component.setState({
        width: 200,
        height: 200
      });
    });

    it('should render Legend', function() {
      expect(component).not.toBeNull();
    });

    it('should render a equal number of keys to items in array', function() {
      var legendItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'hui-Legend__item');

      expect(legendItems.length).toBe(keys.length);
    });


    it('should render text to match items in array', function() {
      keys.forEach(function(key) {
        var legendItems = TestUtils.scryRenderedDOMComponentsWithClass(component, key.className);

        expect(legendItems[0].getDOMNode().textContent).toBe(key.label);
      });
    });


    it('should render items matching classnames given in array', function() {
      keys.forEach(function(key) {
        var legendItems = TestUtils.scryRenderedDOMComponentsWithClass(component, key.className);

        expect(legendItems.length).toBe(1);
      });
    });

  });
});
