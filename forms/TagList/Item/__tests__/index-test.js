'use strict';

var TagListItem = require('../');

describe('Tag List Item', function() {
  describe('default', function() {
    var item = { id: '1', name: 'foo' };
    var onIconClick = sinon.spy();
    var node, component;

    beforeEach(function() {
      component = renderIntoDocument(<TagListItem item={ item } onIconClick={ onIconClick } />);
    });

    it('should render tag name when it is present', function() {
      node = findByClass(component, 'hui-TagListItem__label').getDOMNode();
      expect(node.textContent).to.equal(item.name);
    });

    it('should render remove icon', function() {
      findByClass(component, 'hui-TagListItem__icon');
    });

    it('should call onIconClick when icon is clicked', function() {
      var icon = findByClass(component, 'hui-TagListItem__icon');
      TestUtils.Simulate.click(icon);

      expect(onIconClick).to.have.been.calledOnce;
    });
  });
});
