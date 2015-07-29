'use strict';

var TagList = require('../');

describe('Tag List', function() {
  describe('default', function() {
    var items = [{ id: '1', name: 'foo' }, { id: '2', name: 'bar' }];
    var component = renderIntoDocument(<TagList items={ items } />);
    it('should render tag list', function() {
      findByClass(component, 'TagList');
    });
  });
});
