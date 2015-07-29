'use strict';

var TagList = require('../');

describe('Tag List', function() {
  describe('default', function() {
    var items = ['foo', 'bar'];
    var component = renderIntoDocument(<TagList items={ items } />);
    it('should render tag list', function() {
      findByClass(component, 'TagList');
    });
  });
});
