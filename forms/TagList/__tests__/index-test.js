'use strict';

import TagList from '../'

describe('Tag List', function() {
  describe('default', function() {
    var items = ['foo', 'bar'];
    var component = renderIntoDocument(<TagList items={ items } />);
    it('should render tag list', function() {
      findByClass(component, 'hui-TagList');
    });
  });
});
