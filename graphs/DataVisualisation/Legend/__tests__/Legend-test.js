'use strict'

import Legend from '../'

describe('Legend', function() {
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
      component = renderIntoDocument(<Legend keys={ keys } />);
      component.setState({
        width: 200,
        height: 200
      });
    });

    it('should render Legend', function() {
      component.should.exist;
    });

    it('should render a equal number of keys to items in array', function() {
      var legendItems = scryByClass(component, 'hui-Legend__item');

      legendItems.length.should.equal(keys.length);
    });

    it('should render text to match items in array', function() {
      keys.forEach(function(key) {
        var legendItems = scryByClass(component, key.className);

        legendItems[0].getDOMNode().textContent.should.equal(key.label);
      });
    });

    it('should render items matching classnames given in array', function() {
      keys.forEach(function(key) {
        var legendItems = scryByClass(component, key.className);

        legendItems.length.should.equal(1);
      });
    });
  });
});
