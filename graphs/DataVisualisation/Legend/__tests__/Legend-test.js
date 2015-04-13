"use strict";

jest.autoMockOff();

describe('Legend', function() {
  var React     = require('react/addons');
  var Legend    = require('../index');
  var TestUtils = React.addons.TestUtils;

  var legends = [
    { text: 'label1', className: 'ClassName1' },
    { text: 'label2', className: 'ClassName2' },
    { text: 'label3', className: 'ClassName3' },
    { text: 'label4', className: 'ClassName4' },
    { text: 'label5', className: 'ClassName5' },
    { text: 'label6', className: 'ClassName6' }
  ];

  describe('default', function() {
    var component;

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(<Legend labels={ legends } />);
      component.setState({
        width: 200,
        height: 200
      });
    });

    it('should render Legend', function() {
      expect(component).not.toBeNull();
    });

    it('should render a equal number of legends to items in array', function() {
      var legendItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'hui-Legend__item');

      expect(legendItems.length).toBe(legends.length);
    });


    it('should render text to match items in array', function() {
      legends.forEach(function(label) {
        var legendItems = TestUtils.scryRenderedDOMComponentsWithClass(component, label.className);

        expect(legendItems[0].getDOMNode().textContent).toBe(label.text);
      });
    });


    it('should render items matching classnames given in array', function() {
      legends.forEach(function(label) {
        var legendItems = TestUtils.scryRenderedDOMComponentsWithClass(component, label.className);

        expect(legendItems.length).toBe(1);
      });
    });

  });
});
